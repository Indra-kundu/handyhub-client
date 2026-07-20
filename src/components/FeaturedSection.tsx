import Link from "next/link";
import { Button } from "@heroui/react";
import {
    Wrench,
    Sparkles,
    Zap,
    Snowflake,
} from "lucide-react";


const featuredServices = [
    {
        title: "AC Repair Service",
        category: "Home Appliance",
        price: "৳500",
        rating: "4.8",
        description:
            "Professional AC repair and maintenance service by skilled experts.",
        icon: Snowflake,
    },
    {
        title: "Home Cleaning",
        category: "Cleaning",
        price: "৳800",
        rating: "4.9",
        description:
            "Reliable home cleaning service to keep your house fresh.",
        icon: Sparkles,
    },
    {
        title: "Electrical Repair",
        category: "Electrical",
        price: "৳400",
        rating: "4.7",
        description:
            "Safe and quick electrical solutions from experienced workers.",
        icon: Zap,
    },
    {
        title: "Plumbing Service",
        category: "Repair",
        price: "৳600",
        rating: "4.8",
        description:
            "Fast plumbing support for your home and office.",
        icon: Wrench,
    },
];



export default function FeaturedServices() {

    return (

        <section className="bg-white py-16">


            <div className="mx-auto max-w-7xl px-6">


                {/* Heading */}

                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">


                    <div>

                        <span
                            className="
                rounded-full
                bg-accent/15
                px-4
                py-2
                text-sm
                font-semibold
                text-accent
              "
                        >
                            Featured Services
                        </span>



                        <h2
                            className="
                mt-5
                text-3xl
                font-bold
                text-text-main
                md:text-4xl
              "
                        >
                            Popular Services Near You
                        </h2>



                        <p
                            className="
                mt-3
                max-w-xl
                text-gray-500
              "
                        >
                            Choose from our most requested services
                            provided by trusted local professionals.
                        </p>


                    </div>




                    <Link href="/browse-service">

                        <Button
                            className="
                rounded-full
                bg-primary
                px-6
                text-white
                font-semibold
                hover:opacity-90
              "
                        >
                            View All Services
                        </Button>

                    </Link>


                </div>







                {/* Cards */}

                <div
                    className="
            mt-10
            grid
            grid-cols-1
            gap-6
            sm:grid-cols-2
            lg:grid-cols-4
          "
                >

                    {
                        featuredServices.map((service) => {

                            const Icon = service.icon;


                            return (

                                <div
                                    key={service.title}
                                    className="
                    rounded-3xl
                    border
                    border-gray-100
                    bg-bg-page
                    p-6
                    shadow-sm
                    transition
                    hover:-translate-y-2
                    hover:shadow-xl
                  "
                                >



                                    <div
                                        className="
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-2xl
                      bg-primary
                      text-white
                    "
                                    >
                                        <Icon size={28} />
                                    </div>






                                    <div
                                        className="
                      mt-5
                      flex
                      items-center
                      justify-between
                    "
                                    >

                                        <span
                                            className="
                        text-sm
                        font-medium
                        text-accent
                      "
                                        >
                                            {service.category}
                                        </span>



                                        <span
                                            className="
                        text-sm
                        font-semibold
                        text-yellow-500
                      "
                                        >
                                            ⭐ {service.rating}
                                        </span>


                                    </div>







                                    <h3
                                        className="
                      mt-4
                      text-xl
                      font-bold
                      text-text-main
                    "
                                    >
                                        {service.title}
                                    </h3>





                                    <p
                                        className="
                      mt-3
                      text-sm
                      leading-6
                      text-gray-500
                    "
                                    >
                                        {service.description}
                                    </p>






                                    <div
                                        className="
                      mt-5
                      flex
                      items-center
                      justify-between
                    "
                                    >

                                        <span
                                            className="
                        text-xl
                        font-bold
                        text-primary
                      "
                                        >
                                            {service.price}
                                        </span>



                                        <Link href="/browse-service">

                                            <span
                                                className="
                          cursor-pointer
                          text-sm
                          font-semibold
                          text-primary
                        "
                                            >
                                                Book →
                                            </span>

                                        </Link>


                                    </div>




                                </div>

                            );

                        })
                    }


                </div>


            </div>


        </section>

    );
}