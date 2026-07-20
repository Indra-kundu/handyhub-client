"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import Image from "next/image"; // Image ইম্পোর্ট করুন

export default function Banner() {
    return (
        <section className="bg-bg-page py-10 lg:py-14">
            <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-2">

                {/* Left Content */}
                <div>

                    <span
                        className="
              inline-block
              rounded-full
              bg-accent/15
              px-4
              py-2
              text-sm
              font-semibold
              text-accent
            "
                    >
                        Trusted Local Service Marketplace
                    </span>


                    <h1
                        className="
              mt-6
              text-4xl
              font-extrabold
              leading-tight
              text-text-main
              sm:text-5xl
              lg:text-6xl
            "
                    >
                        Find Trusted
                        <span className="text-primary">
                            {" "}Local Experts
                        </span>
                        {" "}Near You
                    </h1>



                    <p
                        className="
              mt-6
              max-w-xl
              text-lg
              leading-8
              text-gray-600
            "
                    >
                        From home repairs to cleaning, electrical work, and
                        everyday services — connect with skilled professionals
                        in your area and get your job done with confidence.
                    </p>




                    <div className="mt-8 flex flex-col gap-4 sm:flex-row">


                        <Link href="/browse-service">

                            <Button
                                className="
                  rounded-full
                  bg-primary
                  px-8
                  py-3
                  font-semibold
                  text-white
                  shadow-lg
                  hover:opacity-90
                "
                            >
                                Explore Services
                            </Button>

                        </Link>




                        <Link href="/signup">

                            <Button
                                className="
                  rounded-full
                  border
                  border-primary
                  bg-white
                  px-8
                  py-3
                  font-semibold
                  text-primary
                  hover:bg-primary/10
                "
                            >
                                Become a Provider
                            </Button>

                        </Link>


                    </div>




                    {/* Stats */}

                    <div
                        className="
              mt-10
              grid
              grid-cols-3
              gap-5
            "
                    >

                        <div>
                            <h3 className="text-2xl font-bold text-primary">
                                100+
                            </h3>
                            <p className="text-sm text-gray-500">
                                Services
                            </p>
                        </div>



                        <div>
                            <h3 className="text-2xl font-bold text-primary">
                                50+
                            </h3>
                            <p className="text-sm text-gray-500">
                                Professionals
                            </p>
                        </div>



                        <div>
                            <h3 className="text-2xl font-bold text-primary">
                                24/7
                            </h3>
                            <p className="text-sm text-gray-500">
                                Support
                            </p>
                        </div>


                    </div>


                </div>






                {/* Right Image / Illustration */}
                <div className="relative">
                    <div className="absolute -inset-4 rounded-3xl bg-primary/10 blur-2xl" />

                    <div className="relative overflow-hidden rounded-3xl bg-white p-4 shadow-xl">
                        <Image
                            src="/service.jpg"
                            alt="Local service professionals"
                            width={600}  // প্রয়োজনীয় প্রস্থ
                            height={420} // প্রয়োজনীয় উচ্চতা
                            priority     // হিরো ইমেজ হিসেবে এটি দ্রুত লোড করার জন্য
                            className="h-[420px] w-full rounded-2xl object-cover"
                        />
                    </div>
                </div>
            </div>



        </section>
    );
}