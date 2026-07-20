import {
    Search,
    CalendarCheck,
    CheckCircle,
} from "lucide-react";


const steps = [
    {
        number: "01",
        title: "Find a Service",
        description:
            "Browse different categories and find the service you need from trusted local professionals.",
        icon: Search,
    },
    {
        number: "02",
        title: "Book a Professional",
        description:
            "Choose your preferred provider, select a convenient date and place your booking.",
        icon: CalendarCheck,
    },
    {
        number: "03",
        title: "Get Your Work Done",
        description:
            "Relax while skilled professionals complete your service with quality.",
        icon: CheckCircle,
    },
];



export default function HowItWorks() {

    return (

        <section className="bg-bg-page py-16">


            <div className="mx-auto max-w-7xl px-6">


                {/* Heading */}

                <div className="text-center">


                    <span
                        className="
              rounded-full
              bg-primary/10
              px-4
              py-2
              text-sm
              font-semibold
              text-primary
            "
                    >
                        Simple Process
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
                        How HandyHub Works
                    </h2>



                    <p
                        className="
              mx-auto
              mt-3
              max-w-2xl
              text-gray-500
            "
                    >
                        Get your required service in just a few simple
                        steps.
                    </p>


                </div>






                {/* Steps */}

                <div
                    className="
            mt-12
            grid
            grid-cols-1
            gap-8
            md:grid-cols-3
          "
                >

                    {
                        steps.map((step) => {

                            const Icon = step.icon;


                            return (

                                <div
                                    key={step.number}
                                    className="
                    relative
                    rounded-3xl
                    bg-white
                    p-8
                    text-center
                    shadow-sm
                    transition
                    hover:-translate-y-2
                    hover:shadow-xl
                  "
                                >


                                    {/* Number */}

                                    <div
                                        className="
                      absolute
                      right-6
                      top-5
                      text-5xl
                      font-black
                      text-primary/10
                    "
                                    >
                                        {step.number}
                                    </div>





                                    {/* Icon */}

                                    <div
                                        className="
                      mx-auto
                      flex
                      h-16
                      w-16
                      items-center
                      justify-center
                      rounded-2xl
                      bg-primary
                      text-white
                    "
                                    >

                                        <Icon size={30} />

                                    </div>





                                    <h3
                                        className="
                      mt-6
                      text-xl
                      font-bold
                      text-text-main
                    "
                                    >
                                        {step.title}
                                    </h3>





                                    <p
                                        className="
                      mt-3
                      text-sm
                      leading-7
                      text-gray-500
                    "
                                    >
                                        {step.description}
                                    </p>




                                </div>

                            );

                        })
                    }


                </div>



            </div>


        </section>

    );
}