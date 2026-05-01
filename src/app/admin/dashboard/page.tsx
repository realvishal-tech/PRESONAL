import { AdminGuard } from "@/components/admin/AdminGuard";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AboutManager } from "@/components/admin/AboutManager";
import { AnalyticsPanel } from "@/components/admin/AnalyticsPanel";
import { BlogManager } from "@/components/admin/BlogManager";
import { ContactsViewer } from "@/components/admin/ContactsViewer";
import { ProjectsManager } from "@/components/admin/ProjectsManager";
import { SkillsManager } from "@/components/admin/SkillsManager";

export default function AdminDashboardPage() {
  return (
    <AdminGuard>
      <AdminLayout>
        <div className="grid gap-6">
          <AnalyticsPanel />
          <ProjectsManager />
          <SkillsManager />
          <AboutManager />
          <BlogManager />
          <ContactsViewer />
        </div>
      </AdminLayout>
    </AdminGuard>
  );
}
