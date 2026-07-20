"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { Button } from "@heroui/react";

type Service = {
    _id: string;
    title: string;
    description: string;
    price: number;
    category: string;
    image?: string;
};

export default function BrowseServices() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchAllServices = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/services`
                );

                if (!res.ok) {
                    throw new Error("Failed to fetch services");
                }

                const data = await res.json();
                setServices(data);
            } catch (error) {
                console.error("Error fetching services:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllServices();
    }, []);

    // ক্যাটাগরি লিস্ট তৈরি করা
    const categories = useMemo(() => {
        const uniqueCategories = Array.from(new Set(services.map((s) => s.category)));
        return ["All", ...uniqueCategories];
    }, [services]);

    // সার্চ এবং ফিল্টার লজিক
    const filteredServices = useMemo(() => {
        return services.filter((s) => {
            const matchesCategory = selectedCategory === "All" || s.category === selectedCategory;
            const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [selectedCategory, searchQuery, services]);

    return (
        <section className="bg-bg-page min-h-screen py-12">
            <div className="mx-auto max-w-7xl px-6">
                {/* Heading */}
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-bold text-text-main">
                        Available Services
                    </h1>
                    <p className="mt-3 text-gray-500">
                        Find trusted professionals for your everyday needs.
                    </p>
                </div>

                {/* Search and Filter Section */}
                <div className="mb-12 flex flex-col items-center gap-6">
                    {/* Search Input */}
                    <input
                        type="text"
                        placeholder="Search for services..."
                        className="w-full max-w-md rounded-full border border-gray-300 px-6 py-3 shadow-sm outline-none focus:border-primary"
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    {/* Filter Buttons */}
                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`rounded-full px-6 py-2 text-sm font-semibold transition-all duration-200 ${selectedCategory === cat
                                        ? "bg-primary text-white shadow-md"
                                        : "bg-white text-gray-600 shadow-sm hover:bg-gray-100"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="py-20 text-center text-text-main">
                        Loading services...
                    </div>
                ) : filteredServices.length === 0 ? (
                    <div className="rounded-2xl bg-white p-10 text-center shadow-md">
                        <p className="text-lg text-gray-500">
                            No services found matching your criteria.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredServices.map((service) => (
                            <div
                                key={service._id}
                                className="group overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                            >
                                <div className="overflow-hidden">
                                    {service.image ? (
                                        <div className="relative h-56 w-full overflow-hidden">
                                            <Image
                                                src={service.image}
                                                alt={service.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex h-56 items-center justify-center bg-gray-200 text-gray-500">
                                            No Image
                                        </div>
                                    )}
                                </div>

                                <div className="p-5">
                                    <span className="inline-block rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">
                                        {service.category}
                                    </span>
                                    <h2 className="mt-3 text-xl font-bold text-text-main">
                                        {service.title}
                                    </h2>
                                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                                        {service.description}
                                    </p>
                                    <div className="mt-6 flex items-center justify-between">
                                        <span className="text-2xl font-bold text-primary">
                                            ৳{service.price}
                                        </span>
                                        <Link href={`/service/${service._id}`}>
                                            <Button className="rounded-full bg-accent px-5 text-white transition hover:opacity-90">
                                                Book Now
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}