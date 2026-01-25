import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';

export const metadata = {
  title: 'Admin - Obsidian',
  description: 'Panel de administración',
};

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen bg-[var(--color-gothic-abyss)]">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <AdminHeader />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-[var(--color-gothic-abyss)] p-6">
          {children}
        </main>
      </div>
    </div>
  );
}