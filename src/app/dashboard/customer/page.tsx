"use client";

import { useEffect, useState } from "react";
import { Card, Spinner, Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client";

type Booking = {
    _id: string | { $oid: string };
    serviceId: {
        title: string;
        price?: number;
        image?: string;
    };
    bookingDate: string | { $date: string };
    location?: string;
    status: "pending" | "confirmed" | "cancelled";
};

export default function CustomerDashboard() {
    const { data: session } = authClient.useSession();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchCustomerBookings = async () => {
        if (!session?.user?.id) {
            setLoading(false);
            return;
        }

        try {
            setLoading(true);

            const url = `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/customer/${session.user.id}`;
            const res = await fetch(url);

            if (!res.ok) {
                throw new Error(`HTTP error ${res.status}`);
            }

            const data = await res.json();
            setBookings(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Failed to fetch bookings:", error);
            setBookings([]);
        } finally {
            setLoading(false);
        }
    };

    const handleCancelBooking = async (bookingId: string) => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/${bookingId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        status: "cancelled",
                    }),
                }
            );

            if (res.ok) {
                fetchCustomerBookings();
            }
        } catch (error) {
            console.error("Cancel booking error:", error);
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case "confirmed":
                return "Accepted";
            case "cancelled":
                return "Cancelled";
            default:
                return "Pending";
        }
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case "confirmed":
                return "bg-green-100 text-green-700";
            case "cancelled":
                return "bg-red-100 text-red-700";
            default:
                return "bg-yellow-100 text-yellow-700";
        }
    };

    useEffect(() => {
        if (session?.user?.id) {
            fetchCustomerBookings();
        }
    }, [session]);

    if (loading) {
        return (
            <div className="flex min-h-[50vh] items-center justify-center">
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <section className="min-h-screen bg-bg-page py-12">
            <div className="mx-auto max-w-5xl px-6">

                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-text-main">
                        My Bookings
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Manage your service requests and booking status.
                    </p>
                </div>


                {bookings.length > 0 ? (
                    <div className="grid gap-6">

                        {bookings.map((b) => {
                            const id =
                                typeof b._id === "string"
                                    ? b._id
                                    : b._id?.$oid;

                            const dateStr =
                                typeof b.bookingDate === "string"
                                    ? b.bookingDate
                                    : b.bookingDate?.$date;

                            const formattedDate = dateStr
                                ? new Date(dateStr).toLocaleDateString()
                                : "N/A";


                            return (
                                <Card
                                    key={id}
                                    className="
                    rounded-2xl
                    border
                    border-gray-100
                    bg-white
                    p-6
                    shadow-md
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-xl
                  "
                                >

                                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">


                                        {/* Service Info */}
                                        <div>

                                            <h2 className="text-2xl font-bold text-text-main">
                                                {b.serviceId?.title || "Service Name"}
                                            </h2>


                                            <div className="mt-3 space-y-1 text-sm text-gray-600">

                                                <p>
                                                    📅 Date:
                                                    <span className="ml-2 font-semibold text-text-main">
                                                        {formattedDate}
                                                    </span>
                                                </p>


                                                {b.location && (
                                                    <p>
                                                        📍 Location:
                                                        <span className="ml-2 font-medium">
                                                            {b.location}
                                                        </span>
                                                    </p>
                                                )}

                                            </div>


                                            {b.serviceId?.price && (
                                                <p className="mt-3 text-lg font-bold text-primary">
                                                    ৳{b.serviceId.price}
                                                </p>
                                            )}

                                        </div>



                                        {/* Status & Action */}
                                        <div className="flex flex-col items-start gap-3 sm:items-end">

                                            <span
                                                className={`
                          rounded-full
                          px-4
                          py-1
                          text-sm
                          font-semibold
                          ${getStatusStyle(b.status)}
                        `}
                                            >
                                                {getStatusText(b.status)}
                                            </span>


                                            {b.status === "pending" && (
                                                <Button
                                                    onPress={() =>
                                                        id && handleCancelBooking(id)
                                                    }
                                                    className="
                            rounded-full
                            bg-red-500
                            px-5
                            text-white
                            hover:bg-red-600
                            transition
                          "
                                                >
                                                    Cancel Booking
                                                </Button>
                                            )}

                                        </div>

                                    </div>

                                </Card>
                            );
                        })}

                    </div>

                ) : (

                    <div
                        className="
              rounded-2xl
              border-2
              border-dashed
              border-primary/30
              bg-white
              p-12
              text-center
            "
                    >
                        <h3 className="text-xl font-semibold text-text-main">
                            No bookings found
                        </h3>

                        <p className="mt-2 text-gray-500">
                            You have no booking requests yet.
                        </p>
                    </div>

                )}

            </div>
        </section>
    );
}