import { buttonVariants } from "@/components/ui/button";
import { TypographyP } from "@/components/ui/typography";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authenty",
};

export default async function Home() {
  return (
    <div className="m-11">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Welcome to Home Page</CardTitle>
        </CardHeader>
        <CardFooter>
            <Link href="/sign-up" className={buttonVariants()}>
              Get Started
            </Link>
        </CardFooter>
      </Card>
    </div>
  );
}