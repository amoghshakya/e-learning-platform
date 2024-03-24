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
      position: items.findIndex((item) => item.id === lesson.id) + 1,
    }));


    onReorder(bulkUpdateData);
  };

  if (!isMounted) return null;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lessons">
        {(provided, snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {lessons.map((lesson, index) => (
              <Draggable key={lesson.id} draggableId={lesson.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    className={clsx(
                      `group mb-3 flex items-center gap-x-2 rounded-md border border-slate-200 bg-slate-200 text-sm text-slate-700`,
                    )}
                    {...provided.draggableProps}
                    style={{ ...provided.draggableProps.style }}
                  >
                    <div
                      className="rounded-l-md border-r-slate-200 px-2 py-3 transition hover:bg-slate-300"
                      {...provided.dragHandleProps}
                    >
                      <ArrowsPointingOutIcon className="h-4 w-4" />
                    </div>
                    {lesson.title}
                    <div className="ml-auto flex items-center gap-x-2 pr-2">
                      <PencilIcon
                        className="mr-2 h-4 w-4 cursor-pointer opacity-0 transition group-hover:opacity-90"
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
