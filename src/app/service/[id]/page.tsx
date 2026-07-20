"use client";
import Image from "next/image";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button, Input } from "@heroui/react";
import { authClient } from "@/lib/auth-client";

type Service = {
    _id: string;
    title: string;
    description: string;
    price: number;
    category: string;
    image?: string;
    providerId?: string;
};

export default function ServiceDetails() {
    const { id } = useParams();
    const { data: session } = authClient.useSession();

    const [service, setService] = useState<Service | null>(null);
    const [loading, setLoading] = useState(true);
    const [showBooking, setShowBooking] = useState(false);

    const [bookingData, setBookingData] = useState({
        bookingDate: "",
        location: "",
    });


    useEffect(() => {
        const fetchService = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/services/${id}`
                );

                const data = await res.json();
                setService(data);

            } catch (error) {
                console.log("Service fetch error:", error);

            } finally {
                setLoading(false);
            }
        };


        if (id) {
            fetchService();
        }

    }, [id]);




    const handleConfirmBooking = async () => {

        if (!session?.user?.id) {
            alert("Please login to book a service!");
            return;
        }


        try {

            const payload = {
                serviceId: id,
                customerId: session.user.id,
                providerId: service?.providerId || "unknown",
                bookingDate: bookingData.bookingDate,
                totalPrice: service?.price || 0,
                location: bookingData.location,
                status: "pending",
            };


            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/bookings`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );


            if (res.ok) {

                alert("Booking Successful!");

                setShowBooking(false);

                setBookingData({
                    bookingDate: "",
                    location: "",
                });

            } else {

                const errorData = await res.json();

                alert(
                    "Booking failed: " +
                    (errorData.message || "Something went wrong")
                );

            }


        } catch (error) {
            console.log("Booking error:", error);
        }

    };




    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-bg-page">
                <p className="text-text-main">
                    Loading...
                </p>
            </div>
        );
    }



    if (!service) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-bg-page">
                <p className="text-gray-500">
                    Service not found
                </p>
            </div>
        );
    }





    return (

        <section className="min-h-screen bg-bg-page py-12">

            <div className="mx-auto max-w-5xl px-6">


                {/* Service Card */}

                <div
                    className="
            overflow-hidden
            rounded-3xl
            bg-white
            shadow-xl
          "
                >


                    {service.image && (

                        <div className="relative h-56 w-full overflow-hidden">
                            <Image
                                src={service.image}
                                alt={service.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>

                    )}



                    <div className="p-8">


                        <span
                            className="
                inline-block
                rounded-full
                bg-accent/15
                px-4
                py-1
                text-sm
                font-semibold
                text-accent
              "
                        >
                            {service.category}
                        </span>



                        <h1
                            className="
                mt-5
                text-4xl
                font-bold
                text-text-main
              "
                        >
                            {service.title}
                        </h1>



                        <p
                            className="
                mt-5
                text-lg
                leading-8
                text-gray-600
              "
                        >
                            {service.description}
                        </p>



                        <div
                            className="
                mt-6
                text-3xl
                font-bold
                text-primary
              "
                        >
                            ৳{service.price}
                        </div>




                        <Button
                            onPress={() => setShowBooking(true)}
                            className="
                mt-8
                w-full
                rounded-full
                bg-accent
                py-3
                text-white
                font-semibold
                hover:opacity-90
                sm:w-auto
                px-10
              "
                        >
                            Book Now
                        </Button>



                    </div>


                </div>





                {/* Booking Modal */}

                {showBooking && (

                    <div
                        className="
              fixed
              inset-0
              z-50
              flex
              items-center
              justify-center
              bg-black/50
              px-4
            "
                    >


                        <div
                            className="
                w-full
                max-w-md
                rounded-3xl
                bg-white
                p-7
                shadow-2xl
              "
                        >


                            <h2
                                className="
                  text-2xl
                  font-bold
                  text-text-main
                "
                            >
                                Book This Service
                            </h2>




                            <div className="mt-6 space-y-5">


                                <div>

                                    <label className="mb-2 block text-sm font-semibold">
                                        Booking Date
                                    </label>


                                    <Input
                                        type="date"
                                        value={bookingData.bookingDate}
                                        onChange={(e) =>
                                            setBookingData({
                                                ...bookingData,
                                                bookingDate: e.target.value
                                            })
                                        }
                                    />

                                </div>





                                <div>

                                    <label className="mb-2 block text-sm font-semibold">
                                        Location
                                    </label>


                                    <Input
                                        placeholder="Enter your address"
                                        value={bookingData.location}
                                        onChange={(e) =>
                                            setBookingData({
                                                ...bookingData,
                                                location: e.target.value
                                            })
                                        }
                                    />

                                </div>


                            </div>






                            <div className="mt-8 flex justify-end gap-3">


                                <Button
                                    onPress={() =>
                                        setShowBooking(false)
                                    }
                                    className="
                    rounded-full
                    bg-red-100
                    px-5
                    text-red-600
                    hover:bg-red-200
                  "
                                >
                                    Cancel
                                </Button>



                                <Button
                                    onPress={handleConfirmBooking}
                                    className="
                    rounded-full
                    bg-primary
                    px-5
                    text-white
                    hover:opacity-90
                  "
                                >
                                    Confirm
                                </Button>


                            </div>


                        </div>


                    </div>

                )}


            </div>


        </section>

    );
}