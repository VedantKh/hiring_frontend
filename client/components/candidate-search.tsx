"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Logo from "@/app/logo.png";
import { UseMutationResult } from "@tanstack/react-query";
import { Loader2, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useProfileStore } from "../app/page";
import { SearchResultCard } from "./search-result";
import { SearchSlider } from "./search-slider";
import { Button } from "./ui/button";
import { Form } from "./ui/form";
import { Input } from "./ui/input";
import { useEffect } from "react";

const FormSchema = z.object({
  search_string: z.string(),
  experience: z.number().optional(),
  budget: z.number().optional(),
});

export function CandidateSearch({
  mutation,
}: {
  mutation: UseMutationResult<any, Error, any, unknown>;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: FormSchema.parse({
      search_string: "AI Developer",
      experience: 3,
      budget: 5000,
    }),
  });

  useEffect(() => {
    mutation.mutate(form.getValues());
  }, []);

  const set_selected_profile = useProfileStore(
    (state) => state.setSelectedProfile
  );

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    set_selected_profile(-1);
    mutation.mutate(data);
  };

  return (
    <div>
      <Link href="/">
        <Image src={Logo} alt="logo" width={1136 / 12} height={416 / 12} />
      </Link>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex w-full items-center space-x-2 mt-4">
            <Input
              placeholder="Search people..."
              {...form.register("search_string")}
            />
            <Button
              size="icon"
              className="flex-shrink-0"
              disabled={mutation.isPending}
              type="submit"
            >
              {mutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}
            </Button>
          </div>
          <div className="mt-2 space-y-2">
            <SearchSlider
              control={form.control}
              name="budget"
              label="Monthly Budget"
              min={500}
              max={10000}
              step={500}
              template={(value) =>
                value === 10000 ? "> $10000" : `< $${value}`
              }
              defaultValue={5000}
            />
            <SearchSlider
              control={form.control}
              name="experience"
              label="Years of Experience"
              min={0}
              max={10}
              step={1}
              template={(value) => `${value}+ years`}
              defaultValue={3}
            />
            {/* <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Years of Experience</SelectLabel>
                      <SelectItem value="0">0+ years</SelectItem>
                      <SelectItem value="1">1+ year</SelectItem>
                      <SelectItem value="2">2+ years</SelectItem>
                      <SelectItem value="3">3+ years</SelectItem>
                      <SelectItem value="4">4+ years</SelectItem>
                      <SelectItem value="5">5+ years</SelectItem>
                      <SelectItem value="6">6+ years</SelectItem>
                      <SelectItem value="7">7+ years</SelectItem>
                      <SelectItem value="8">8+ years</SelectItem>
                      <SelectItem value="9">9+ years</SelectItem>
                      <SelectItem value="10">10+ years</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            /> */}
            {/* <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Monthly Budget</SelectLabel>
                      <SelectItem value="500">&lt; $500</SelectItem>
                      <SelectItem value="1000">&lt; $1000</SelectItem>
                      <SelectItem value="1500">&lt; $1500</SelectItem>
                      <SelectItem value="2000">&lt; $2000</SelectItem>
                      <SelectItem value="2500">&lt; $2500</SelectItem>
                      <SelectItem value="3000">&lt; $3000</SelectItem>
                      <SelectItem value="3500">&lt; $3500</SelectItem>
                      <SelectItem value="4000">&lt; $4000</SelectItem>
                      <SelectItem value="4500">&lt; $4500</SelectItem>
                      <SelectItem value="5000">&lt; $5000</SelectItem>
                      <SelectItem value="5500">&lt; $5500</SelectItem>
                      <SelectItem value="6000">&lt; $6000</SelectItem>
                      <SelectItem value="6500">&lt; $6500</SelectItem>
                      <SelectItem value="7000">&lt; $7000</SelectItem>
                      <SelectItem value="7500">&lt; $7500</SelectItem>
                      <SelectItem value="8000">&lt; $8000</SelectItem>
                      <SelectItem value="8500">&lt; $8500</SelectItem>
                      <SelectItem value="9000">&lt; $9000</SelectItem>
                      <SelectItem value="10000">&gt; $10000</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            /> */}
          </div>
        </form>
      </Form>
      <ul className={`mt-6 grid grid-cols-1 gap-6`}>
        {mutation.data?.map((result: any, index: number) => (
          <SearchResultCard
            onClick={() => {
              set_selected_profile(index);
            }}
            key={index}
            profile={result}
          />
        ))}
        <SearchResultCard />
      </ul>
    </div>
  );
}
