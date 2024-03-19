"use client";

import { Lesson } from "@prisma/client";
import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import clsx from "clsx";
import { ArrowsPointingOutIcon, PencilIcon } from "@heroicons/react/24/outline";

interface LessonsListProps {
  items: Lesson[];
  onEdit: (id: string) => void;
  onReorder: (updateData: { id: string; position: number }[]) => void;
}

export function LessonsList({ items, onEdit, onReorder }: LessonsListProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [lessons, setLessons] = useState(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setLessons(items);
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(lessons);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedLessons = items.slice(startIndex, endIndex + 1);
    setLessons(items);

    const bulkUpdateData = updatedLessons.map((lesson) => ({
      id: lesson.id,
      position: items.findIndex((item) => item.id === lesson.id)
    }))

    onReorder(bulkUpdateData)
  };

  if (!isMounted) return null;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lessons">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {lessons.map((lesson, index) => (
              <Draggable key={lesson.id} draggableId={lesson.id} index={index}>
                {(provided) => (
                  <div
                    className={clsx(
                      "flex group items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate700 rounded-md mb-3 text-sm"
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                      className="px-2 py-3 border-r-slate-200 hover:bg-slate-300 rounded-l-md transition"
                      {...provided.dragHandleProps}
                    >
                      <ArrowsPointingOutIcon className="w-4 h-4" />
                    </div>
                    {lesson.title}
                    <div className="ml-auto pr-2 flex items-center gap-x-2">
                      <PencilIcon
                        className="w-4 h-4 mr-2 cursor-pointer opacity-0 group-hover:opacity-90 transition"
                        onClick={() => onEdit(lesson.id)}
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
