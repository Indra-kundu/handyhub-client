"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button, Input, Card } from "@heroui/react";
import { authClient } from "@/lib/auth-client";

type Service = {
    _id: string;
    title: string;
    description: string;
    price: number;
    category: string;
    image: string;
};

type Booking = {
    _id: string;
    serviceId: {
        title: string;
    };
    bookingDate: string;
    location: string;
    status: string;
};

export default function ProviderDashboard() {
    const { data: session } = authClient.useSession();
    const [activeTab, setActiveTab] = useState("services");
    const [services, setServices] = useState<Service[]>([]);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        image: "",
    });

    const getAuthHeaders = () => {
        // এখানে 'session as any' ব্যবহার করে টাইপস্ক্রিপ্ট এররটি এড়িয়ে যাওয়া হলো
        const token = (session as any)?.token || "";

        return {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };
    };
    const fetchServices = async () => {
        if (!session?.user?.id) return;
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services/provider/${session.user.id}`);
            const data = await res.json();
            setServices(Array.isArray(data) ? data : data.services || []);
        } catch (error) {
            console.error("Fetch services error:", error);
            setServices([]);
        }
    };

    const fetchBookings = async () => {
        if (!session?.user?.id) return;
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/provider/${session.user.id}`);
            const data = await res.json();
            setBookings(Array.isArray(data) ? data : data.bookings || []);
        } catch (error) {
            console.error("Fetch bookings error:", error);
            setBookings([]);
        }
    };

    useEffect(() => {
        if (session?.user?.id) {
            fetchServices();
            fetchBookings();
        }
    }, [session]);

    const handleDeleteBooking = async (id: string) => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/${id}`, {
                method: "DELETE",
                headers: getAuthHeaders(),
            });
            fetchBookings();
        } catch (error) {
            console.error("Delete booking error:", error);
        }
    };

    const handleUpdateStatus = async (id: string, status: string) => {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/${id}`, {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify({ status }),
        });
        fetchBookings();
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const url = editingId
            ? `${process.env.NEXT_PUBLIC_API_URL}/api/services/${editingId}`
            : `${process.env.NEXT_PUBLIC_API_URL}/api/services`;
        const method = editingId ? "PUT" : "POST";

        await fetch(url, {
            method,
            headers: getAuthHeaders(),
            body: JSON.stringify({
                ...formData,
                price: Number(formData.price),
                providerId: session?.user?.id,
            }),
        });

        setFormData({ title: "", description: "", price: "", category: "", image: "" });
        setEditingId(null);
        fetchServices();
    };

    return (
        <section className="min-h-screen bg-bg-page py-12">
            <div className="mx-auto max-w-6xl px-6">
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-text-main">Provider Dashboard</h1>
                    <p className="mt-2 text-gray-500">Manage your services and customer booking requests.</p>
                </div>

                <div className="mb-8 flex gap-4">
                    <Button onPress={() => setActiveTab("services")} className={`rounded-full px-6 py-2 font-semibold ${activeTab === "services" ? "bg-primary text-white" : "bg-white border"}`}>
                        My Services
                    </Button>
                    <Button onPress={() => setActiveTab("bookings")} className={`rounded-full px-6 py-2 font-semibold ${activeTab === "bookings" ? "bg-primary text-white" : "bg-white border"}`}>
                        Booking Requests
                    </Button>
                </div>

                {activeTab === "services" && (
                    <div>
                        <div className="mb-10 rounded-2xl bg-white p-8 shadow-md">
                            <h2 className="mb-6 text-2xl font-bold text-text-main">{editingId ? "Update Service" : "Add New Service"}</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">Service Title</label>
                                    <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                                </div>

                                <textarea className="min-h-[120px] w-full rounded-xl border p-4 outline-none" placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />

                                <div className="grid gap-5 md:grid-cols-2">
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">Price</label>
                                        <Input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">Category</label>
                                        <Input value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
                                    </div>
                                </div>

                                <input type="url" placeholder="Image URL" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} className="w-full rounded-xl border p-3" required />

                                <Button type="submit" className="w-full rounded-full bg-primary py-3 text-white font-semibold">{editingId ? "Update Service" : "Add Service"}</Button>
                            </form>
                        </div>

                        <div className="grid gap-6 md:grid-cols-3">
                            {services.map((s) => (
                                <Card key={s._id} className="overflow-hidden rounded-2xl bg-white p-5 shadow-md">
                                    <div className="relative h-44 w-full"><Image src={s.image} alt={s.title} fill className="object-cover" /></div>
                                    <h3 className="text-xl font-bold mt-4">{s.title}</h3>
                                    <p className="text-sm text-gray-500">{s.category}</p>
                                    <p className="text-xl font-bold text-primary">৳{s.price}</p>
                                    <div className="mt-5 flex gap-3">
                                        <Button onPress={() => { setEditingId(s._id); setFormData({ title: s.title, description: s.description, price: String(s.price), category: s.category, image: s.image }); }} className="rounded-full bg-accent text-white px-5">Edit</Button>
                                        <Button onPress={async () => { await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services/${s._id}`, { method: "DELETE", headers: getAuthHeaders() }); fetchServices(); }} className="rounded-full bg-red-500 text-white px-5">Delete</Button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === "bookings" && (
                    <div className="space-y-5">
                        {bookings.map((b) => (
                            <div key={b._id} className="flex flex-col md:flex-row justify-between rounded-2xl bg-white p-6 shadow-md">
                                <div>
                                    <h3 className="text-xl font-bold">{b.serviceId?.title || "Service"}</h3>
                                    <p className="text-gray-500">Date: {b.bookingDate}</p>
                                    <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">{b.status}</span>
                                </div>
                                <div className="flex gap-3">
                                    {b.status === "pending" && (
                                        <Button onPress={() => handleUpdateStatus(b._id, "confirmed")} className="rounded-full bg-green-500 text-white">Accept</Button>
                                    )}
                                    <Button onPress={() => handleDeleteBooking(b._id)} className="rounded-full bg-red-500 text-white">Delete</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}