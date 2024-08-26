import { StatCard } from "@/components/StatCard";
import { columns } from "@/components/table/columns";
import {DataTable} from "@/components/table/DataTable";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";



const Admin = async () => {
  const appointments = await getRecentAppointmentList();

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link href="/">
          <Image
            src="/assets/icons/logo-full.svg"
            width={32}
            height={162}
            alt="logo"
            className="w-fit h-8"
          />
        </Link>
        <div className="flex items-center space-x-3">
          <Image
            src="/assets/images/admin.png"
            width={32}
            height={162}
            alt="logo"
            className="w-fit h-8"
          />
          <span className="text-16-semibold">Admin</span>
        </div>
      </header>
      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome, Admin 👋</h1>
          <p className="text-dark-700">
            Start day with managing new appointments
          </p>
        </section>
        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={appointments.scheduledCount}
            label="Total number of  scheduled appointments"
            icon="/assets/icons/appointments.svg"
          />
          <StatCard
            type="pending"
            count={appointments.pendingCount}
            label="Total number of pending appointments"
            icon="/assets/icons/pending.svg"
          />
          <StatCard
            type="cancelled"
            count={appointments.cancelledCount}
            label="Total number of cancelled appointments"
            icon="/assets/icons/cancelled.svg"
          />
        </section>
        <DataTable columns={columns} data={appointments.documents} />
      </main>
    </div>
  );
};

export default Admin;
