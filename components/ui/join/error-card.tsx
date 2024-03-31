import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../card";
import { Button } from "../button";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

function ErrorCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Oops! Something went wrong!</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-center">
        <Link href="/join/login">
          <Button
            variant="ghost"
            className="border border-slate-100 bg-slate-200 p-5"
          >
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Back to login
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

export default ErrorCard;
