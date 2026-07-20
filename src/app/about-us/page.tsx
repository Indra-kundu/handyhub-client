import Link from "next/link";
import { Button } from "@heroui/react";
import {
    Users,
    ShieldCheck,
    Clock,
    Star,
    Target,
    HeartHandshake,
} from "lucide-react";


export default function AboutPage() {

    return (

        <main className="bg-bg-page">


            {/* Hero Section */}

            <section className="py-20">

                <div
                    className="
            mx-auto
            max-w-7xl
            px-6
            text-center
          "
                >

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
                        About HandyHub
                    </span>



                    <h1
                        className="
              mt-6
              text-4xl
              font-extrabold
              text-text-main
              md:text-6xl
            "
                    >
                        Connecting You With
                        <span className="text-primary">
                            {" "}Trusted Local Experts
                        </span>
                    </h1>




                    <p
                        className="
              mx-auto
              mt-6
              max-w-3xl
              text-lg
              leading-8
              text-gray-600
            "
                    >
                        HandyHub is a local service marketplace that helps
                        customers find skilled professionals for their
                        everyday needs. From home repair to cleaning,
                        we make booking reliable services simple and easy.
                    </p>


                </div>


            </section>









            {/* Mission Vision */}

            <section className="bg-white py-16">


                <div
                    className="
            mx-auto
            grid
            max-w-7xl
            gap-8
            px-6
            md:grid-cols-2
          "
                >



                    <div
                        className="
              rounded-3xl
              bg-bg-page
              p-8
              shadow-sm
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

                            <Target />

                        </div>



                        <h2
                            className="
                mt-5
                text-2xl
                font-bold
                text-text-main
              "
                        >
                            Our Mission
                        </h2>



                        <p
                            className="
                mt-3
                leading-7
                text-gray-600
              "
                        >
                            Our mission is to make local services
                            accessible, reliable, and convenient by
                            connecting customers with verified
                            professionals.
                        </p>


                    </div>








                    <div
                        className="
              rounded-3xl
              bg-bg-page
              p-8
              shadow-sm
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
                bg-accent
                text-white
              "
                        >

                            <HeartHandshake />

                        </div>



                        <h2
                            className="
                mt-5
                text-2xl
                font-bold
                text-text-main
              "
                        >
                            Our Vision
                        </h2>



                        <p
                            className="
                mt-3
                leading-7
                text-gray-600
              "
                        >
                            We want to build the most trusted local
                            service platform where every customer can
                            easily find quality professionals nearby.
                        </p>


                    </div>



                </div>


            </section>









            {/* Why Choose */}

            <section className="py-16">


                <div className="mx-auto max-w-7xl px-6">


                    <div className="text-center">


                        <h2
                            className="
                text-3xl
                font-bold
                text-text-main
              "
                        >
                            Why Choose HandyHub?
                        </h2>


                    </div>






                    <div
                        className="
              mt-10
              grid
              gap-6
              sm:grid-cols-2
              lg:grid-cols-4
            "
                    >


                        {[
                            {
                                icon: Users,
                                title: "Verified Professionals",
                                text: "Connect with skilled local service providers."
                            },
                            {
                                icon: ShieldCheck,
                                title: "Safe Booking",
                                text: "Reliable and secure service experience."
                            },
                            {
                                icon: Clock,
                                title: "Fast Response",
                                text: "Find help when you need it."
                            },
                            {
                                icon: Star,
                                title: "Quality Service",
                                text: "Get professional work with confidence."
                            },
                        ].map((item) => {


                            const Icon = item.icon;


                            return (

                                <div
                                    key={item.title}
                                    className="
                    rounded-3xl
                    bg-white
                    p-6
                    text-center
                    shadow-sm
                    hover:shadow-xl
                    transition
                  "
                                >

                                    <Icon
                                        className="
                      mx-auto
                      text-primary
                    "
                                        size={35}
                                    />


                                    <h3
                                        className="
                      mt-4
                      font-bold
                      text-text-main
                    "
                                    >
                                        {item.title}
                                    </h3>


                                    <p
                                        className="
                      mt-2
                      text-sm
                      text-gray-500
                    "
                                    >
                                        {item.text}
                                    </p>


                                </div>

                            )


                        })}


                    </div>


                </div>


            </section>









            {/* CTA */}

            <section className="pb-20">


                <div
                    className="
            mx-auto
            max-w-7xl
            px-6
          "
                >


                    <div
                        className="
              rounded-3xl
              bg-primary
              p-10
              text-center
              text-white
            "
                    >


                        <h2
                            className="
                text-3xl
                font-bold
              "
                        >
                            Ready to Find Your Service Expert?
                        </h2>


                        <p
                            className="
                mt-3
                text-white/80
              "
                        >
                            Explore hundreds of local services
                            and book your professional today.
                        </p>



                        <Link href="/browse-service">

                            <Button
                                className="
                  mt-6
                  rounded-full
                  bg-accent
                  px-8
                  font-semibold
                  text-white
                "
                            >
                                Explore Services
                            </Button>

                        </Link>


                    </div>


                </div>


            </section>


        </main>

    );
}