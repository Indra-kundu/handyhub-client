import Link from "next/link";
import {
    Wrench,
    Sparkles,
    Zap,
    Snowflake,
    Droplets,
    Laptop,
} from "lucide-react";


const categories = [
    {
        title: "Home Repair",
        description: "Fix and maintain your home easily.",
        icon: Wrench,
    },
    {
        title: "Cleaning Service",
        description: "Professional home cleaning experts.",
        icon: Sparkles,
    },
    {
        title: "Electrical Service",
        description: "Safe and reliable electrical work.",
        icon: Zap,
    },
    {
        title: "AC Repair",
        description: "Cooling solutions by experts.",
        icon: Snowflake,
    },
    {
        title: "Plumbing",
        description: "Fast plumbing solutions nearby.",
        icon: Droplets,
    },
    {
        title: "Computer Repair",
        description: "Laptop and PC repair services.",
        icon: Laptop,
    },
];



export default function PopularCategories() {

    return (

        <section className="bg-white py-16">

            <div className="mx-auto max-w-7xl px-6">


                {/* Heading */}

                <div className="text-center">


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
                        Explore Services
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
                        Popular Service Categories
                    </h2>



                    <p
                        className="
              mx-auto
              mt-3
              max-w-2xl
              text-gray-500
            "
                    >
                        Find trusted professionals for your everyday
                        needs from different service categories.
                    </p>


                </div>






                {/* Cards */}

                <div
                    className="
            mt-10
            grid
            grid-cols-1
            gap-6
            sm:grid-cols-2
            lg:grid-cols-3
          "
                >

                    {
                        categories.map((category) => {

                            const Icon = category.icon;


                            return (

                                <Link
                                    href="/browse-service"
                                    key={category.title}
                                    className="
                    group
                    rounded-3xl
                    border
                    border-gray-100
                    bg-bg-page
                    p-6
                    shadow-sm
                    transition
                    hover:-translate-y-1
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
                      bg-primary/10
                      text-primary
                      transition
                      group-hover:bg-primary
                      group-hover:text-white
                    "
                                    >

                                        <Icon size={28} />

                                    </div>





                                    <h3
                                        className="
                      mt-5
                      text-xl
                      font-bold
                      text-text-main
                    "
                                    >
                                        {category.title}
                                    </h3>




                                    <p
                                        className="
                      mt-2
                      text-sm
                      leading-6
                      text-gray-500
                    "
                                    >
                                        {category.description}
                                    </p>




                                    <p
                                        className="
                      mt-4
                      font-semibold
                      text-primary
                    "
                                    >
                                        Explore →
                                    </p>



                                </Link>

                            );

                        })
                    }


                </div>


            </div>


        </section>

    );
}