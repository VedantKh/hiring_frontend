import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clipboard, Loader2, Mail, Send } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { Checkbox } from "./ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { EmailTemplateProps } from "./email-template";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "./ui/form";
import Link from "next/link";

export const FormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  companyName: z.string(),
  companyWebsite: z.string().url(),
  commitment: z.enum(["fullTime", "partTime", "either"]),
  jobSummary: z.string(),
  schedulingInstructions: z.string(),
  termsAgreement: z.boolean().default(false),
});

export function AskForIntro({ profile }: any) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: EmailTemplateProps) =>
      fetch("/api/send", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await mutation.mutate({
      ...data,
      candidateName: profile.name,
      candidateUserId: profile.userId,
      candidateSkills: profile.skills,
    });
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <Mail className="mr-2 w-4 h-4" />
            Ask for intro
          </Button>
        </DialogTrigger>
        <Button
          className="ml-2"
          variant="outline"
          onClick={() => {
            const url = `${window.location.origin}/profile/${profile.userId}`;
            navigator.clipboard.writeText(url);
            toast({
              title: "Profile link copied",
              description: "The profile URL has been copied to your clipboard.",
            });
          }}
        >
          <Clipboard className="mr-2 w-4 h-4" />
          Share profile
        </Button>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Request Intro</DialogTitle>
            <DialogDescription>
              You will be introduced to {profile.name} in the next 24 hours over
              your email.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid gap-4 py-4"
            >
              {Object.values(form.formState.errors).length > 0 && (
                <div className="text-red-500 text-sm mb-4">
                  {Object.values(form.formState.errors).map((error, index) => (
                    <p key={index}>{error.message}</p>
                  ))}
                </div>
              )}
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Label htmlFor="firstName" className="mb-2 block">
                    First Name
                  </Label>
                  <Input id="firstName" {...form.register("firstName")} />
                </div>
                <div className="flex-1">
                  <Label htmlFor="lastName" className="mb-2 block">
                    Last Name
                  </Label>
                  <Input id="lastName" {...form.register("lastName")} />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Label htmlFor="email" className="mb-2 block">
                    Email
                  </Label>
                  <Input id="email" type="email" {...form.register("email")} />
                </div>
                <div className="flex-1">
                  <Label htmlFor="phone" className="mb-2 block">
                    Phone
                  </Label>
                  <Input id="phone" type="tel" {...form.register("phone")} />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Label htmlFor="companyName" className="mb-2 block">
                    Company Name
                  </Label>
                  <Input id="companyName" {...form.register("companyName")} />
                </div>
                <div className="flex-1">
                  <Label htmlFor="companyWebsite" className="mb-2 block">
                    Company Website
                  </Label>
                  <Input
                    id="companyWebsite"
                    type="url"
                    {...form.register("companyWebsite")}
                  />
                </div>
              </div>
              <FormField
                control={form.control}
                name="commitment"
                render={({ field }) => (
                  <div>
                    <Label htmlFor="commitment" className="mb-2 block">
                      Preferred Time Commitment
                    </Label>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fullTime">Full Time</SelectItem>
                        <SelectItem value="partTime">Part Time</SelectItem>
                        <SelectItem value="either">Either</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />
              <div>
                <Label htmlFor="jobSummary" className="mb-2 block">
                  Job Summary
                </Label>
                <Textarea
                  id="jobSummary"
                  rows={3}
                  {...form.register("jobSummary")}
                />
              </div>
              <div>
                <Label htmlFor="schedulingInstructions" className="mb-2 block">
                  Scheduling Instructions
                </Label>
                <Textarea
                  id="schedulingInstructions"
                  rows={3}
                  {...form.register("schedulingInstructions")}
                />
              </div>
              <div className="flex items-center gap-2 w-full">
                <FormField
                  control={form.control}
                  name="termsAgreement"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 w-full">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none w-full">
                        <FormLabel>I agree to the terms of service.</FormLabel>
                        <FormDescription>
                          By checking this box, you agree to our{" "}
                          <Link
                            href="/tos"
                            className="underline"
                            target="_blank"
                          >
                            terms of service
                          </Link>
                          .
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <Button
                className="w-full"
                type="submit"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Send className="mr-2 w-4 h-4" />
                )}
                Request Intro
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
