"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import NavBar from "@/components/ui/landing/Navbar";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeftIcon,
  CheckIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function ContactPage() {
  const [messageSent, setMessageSent] = useState(false);
  return (
    <>
      <NavBar showLinks={true} />
      <Card className="m-4 px-6 md:m-auto md:my-8 md:w-2/3 md:py-12">
        <CardContent>
          <div className="flex items-center justify-between">
            <Image
              src="/static/mailbox.svg"
              alt="mailbox illustration"
              height={200}
              width={200}
              className="ml-10"
            />
            <div className="flex flex-col gap-y-2 md:w-1/2">
              <CardHeader>
                <h1 className="text-3xl font-black">Send us a message!</h1>
              </CardHeader>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input type="text" placeholder="Subject" id="subject" />
              </div>
              <div>
                <Label htmlFor="subject">Message</Label>
                <Textarea placeholder="Send us a message..." id="message" />
              </div>
              <div className="transition">
                <Button
                  disabled={messageSent}
                  aria-disabled={messageSent}
                  type="button"
                  onClick={() => setMessageSent((prev) => !prev)}
                >
                  {messageSent ? (
                    <>
                      <CheckIcon className="mr-2 h-4 w-4" />
                      Sent
                    </>
                  ) : (
                    <>
                      <EnvelopeIcon className="mr-2 h-4 w-4" />
                      Send
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default ContactPage;
