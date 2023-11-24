"use client";

import useQueryParams from "@/hooks/useQueryParams";
import { redirect } from "next/navigation";

function Page() {
  redirect("/" + useQueryParams().paramsString());
}

export default Page;
