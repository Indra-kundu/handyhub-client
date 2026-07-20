import Link from "next/link";
import {
    MapPin,
    Phone,
    Mail,
} from "lucide-react";


export default function Footer() {

    return (

        <footer className="bg-text-main text-white">


            <div
                className="
          mx-auto
          max-w-7xl
          px-6
          py-14
        "
            >


                <div
                    className="
            grid
            grid-cols-1
            gap-10
            md:grid-cols-4
          "
                >



                    {/* Brand */}

                    <div>


                        <Link
                            href="/"
                            className="
                text-3xl
                font-extrabold
              "
                        >

                            Handy
                            <span className="text-accent">
                                Hub
                            </span>

                        </Link>



                        <p
                            className="
                mt-4
                text-sm
                leading-7
                text-gray-300
              "
                        >
                            Find trusted local professionals
                            for your everyday services.
                            Easy booking, reliable support,
                            and quality work.
                        </p>



                    </div>








                    {/* Quick Links */}

                    <div>


                        <h3
                            className="
                text-lg
                font-bold
              "
                        >
                            Quick Links
                        </h3>



                        <ul
                            className="
                mt-5
                space-y-3
                text-sm
                text-gray-300
              "
                        >

                            <li>
                                <Link
                                    href="/"
                                    className="hover:text-accent"
                                >
                                    Home
                                </Link>
                            </li>


                            <li>
                                <Link
                                    href="/browse-service"
                                    className="hover:text-accent"
                                >
                                    Browse Services
                                </Link>
                            </li>


                            <li>
                                <Link
                                    href="/about"
                                    className="hover:text-accent"
                                >
                                    About Us
                                </Link>
                            </li>


                            <li>
                                <Link
                                    href="/signup"
                                    className="hover:text-accent"
                                >
                                    Become Provider
                                </Link>
                            </li>


                        </ul>


                    </div>








                    {/* Services */}

                    <div>


                        <h3
                            className="
                text-lg
                font-bold
              "
                        >
                            Services
                        </h3>



                        <ul
                            className="
                mt-5
                space-y-3
                text-sm
                text-gray-300
              "
                        >

                            <li>
                                Home Repair
                            </li>

                            <li>
                                Cleaning Service
                            </li>

                            <li>
                                Electrical Service
                            </li>

                            <li>
                                AC Repair
                            </li>

                            <li>
                                Plumbing
                            </li>


                        </ul>


                    </div>








                    {/* Contact */}

                    <div>


                        <h3
                            className="
                text-lg
                font-bold
              "
                        >
                            Contact Us
                        </h3>



                        <div
                            className="
                mt-5
                space-y-4
                text-sm
                text-gray-300
              "
                        >


                            <p className="flex items-center gap-3">

                                <MapPin
                                    size={18}
                                    className="text-accent"
                                />

                                Dhaka, Bangladesh

                            </p>




                            <p className="flex items-center gap-3">

                                <Phone
                                    size={18}
                                    className="text-accent"
                                />

                                +880 1234-567890

                            </p>





                            <p className="flex items-center gap-3">

                                <Mail
                                    size={18}
                                    className="text-accent"
                                />

                                support@handyhub.com

                            </p>



                        </div>


                    </div>



                </div>







                {/* Bottom */}

                <div
                    className="
            mt-12
            border-t
            border-white/10
            pt-6
            text-center
            text-sm
            text-gray-400
          "
                >

                    © {new Date().getFullYear()} HandyHub.
                    All rights reserved.

                </div>



            </div>


        </footer>

    );
}