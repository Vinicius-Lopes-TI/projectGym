// Import Dependencies
import { useState, useMemo } from "react";
import { UsersIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

// Local Imports
import { Page } from "@/components/shared/Page";
import { mockStudents, type Student } from "@/data/mock-students";
import { StudentCard } from "@/components/shared/students/StudentCard";
import { StudentFilters } from "@/components/shared/students/StudentFilters";
import { StudentRestrictionModal } from "@/components/shared/students/StudentRestrictionModal";

// ----------------------------------------------------------------------

export default function StudentsPage() {
    const [search, setSearch] = useState("");
    const [restrictionFilter, setRestrictionFilter] = useState("all");
    const [experienceFilter, setExperienceFilter] = useState("all");
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    const filtered = useMemo(() => {
        return mockStudents.filter((s) => {
            const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase());
            const matchesRestriction =
                restrictionFilter === "all" || s.restrictions.some((r) => r.type === restrictionFilter);
            const matchesExperience =
                experienceFilter === "all" || s.experience === experienceFilter;
            return matchesSearch && matchesRestriction && matchesExperience;
        });
    }, [search, restrictionFilter, experienceFilter]);

    const alertCount = mockStudents.filter((s) => s.hasAlert).length;

    const handleViewRestrictions = (student: Student) => {
        setSelectedStudent(student);
        setModalOpen(true);
    };

    return (
        <Page title="Restrições dos Alunos">
            <div className="min-h-100vh">
                {/* Header */}
                <div className="border-b border-gray-200 bg-white dark:border-dark-600 dark:bg-dark-700">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h1 className="flex items-center gap-2 text-2xl font-semibold text-gray-800 dark:text-dark-50">
                                    <UsersIcon className="h-7 w-7 text-primary-500" />
                                    Restrições dos Alunos
                                </h1>
                                <p className="mt-1 text-sm text-gray-400 dark:text-dark-300">
                                    Visualize as restrições e inicie o cadastro de treinos personalizados
                                </p>
                            </div>

                            {alertCount > 0 && (
                                <div className="flex items-center gap-2 rounded-lg border border-error/30 bg-error/10 px-3 py-2 text-sm font-medium text-error">
                                    <ExclamationTriangleIcon className="h-4 w-4 shrink-0" />
                                    {alertCount} aluno{alertCount > 1 ? "s" : ""} com atenção especial
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Main content */}
                <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <StudentFilters
                        search={search}
                        onSearchChange={setSearch}
                        restrictionFilter={restrictionFilter}
                        onRestrictionFilterChange={setRestrictionFilter}
                        experienceFilter={experienceFilter}
                        onExperienceFilterChange={setExperienceFilter}
                    />

                    <p className="mt-4 text-sm text-gray-400 dark:text-dark-300">
                        {filtered.length} aluno{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
                    </p>

                    {filtered.length === 0 ? (
                        <div className="mt-16 flex flex-col items-center gap-3 text-center">
                            <UsersIcon className="h-12 w-12 text-gray-300 dark:text-dark-500" />
                            <p className="font-medium text-gray-500 dark:text-dark-300">Nenhum aluno encontrado</p>
                            <p className="text-sm text-gray-400 dark:text-dark-400">Tente ajustar os filtros</p>
                        </div>
                    ) : (
                        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {filtered.map((student) => (
                                <StudentCard
                                    key={student.id}
                                    student={student}
                                    onViewRestrictions={handleViewRestrictions}
                                />
                            ))}
                        </div>
                    )}
                </main>

                <StudentRestrictionModal
                    student={selectedStudent}
                    open={modalOpen}
                    onOpenChange={setModalOpen}
                />
            </div>
        </Page>
    );
}
