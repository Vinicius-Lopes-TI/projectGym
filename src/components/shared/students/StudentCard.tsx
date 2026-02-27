// Import Dependencies
import clsx from "clsx";
import { ExclamationTriangleIcon, EyeIcon } from "@heroicons/react/24/outline";

// Local Imports
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { Student } from "@/data/mock-students";

// ----------------------------------------------------------------------

interface Props {
    student: Student;
    onViewRestrictions: (student: Student) => void;
}

const experienceConfig: Record<string, { color: "success" | "info" | "secondary"; label: string }> = {
    Iniciante: { color: "success", label: "Iniciante" },
    Intermediário: { color: "info", label: "Intermediário" },
    Avançado: { color: "secondary", label: "Avançado" },
};

const severityConfig: Record<string, { color: "error" | "warning" | "neutral" }> = {
    high: { color: "error" },
    medium: { color: "warning" },
    low: { color: "neutral" },
};

export function StudentCard({ student, onViewRestrictions }: Props) {
    const expConfig = experienceConfig[student.experience] ?? { color: "neutral" as const, label: student.experience };

    return (
        <Card className="relative p-5 transition-shadow hover:shadow-md">
            {student.hasAlert && (
                <div className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-error text-white shadow-sm">
                    <ExclamationTriangleIcon className="h-3.5 w-3.5" />
                </div>
            )}

            {/* Header */}
            <div className="mb-3 flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-500 text-sm font-semibold text-white">
                    {student.avatarInitials}
                </div>
                <div className="min-w-0 flex-1">
                    <h3 className="truncate font-semibold leading-tight text-gray-800 dark:text-dark-50">
                        {student.name}
                    </h3>
                    <div className="mt-1 flex items-center gap-2">
                        <span className="text-xs text-gray-400 dark:text-dark-300">{student.age} anos</span>
                        <Badge
                            variant="soft"
                            color={expConfig.color}
                            className="text-xs"
                        >
                            {student.experience}
                        </Badge>
                    </div>
                </div>
            </div>

            {/* Restriction tags */}
            <div className="mb-3 flex flex-wrap gap-1.5">
                {student.restrictions.map((r, i) => (
                    <Badge
                        key={i}
                        variant="soft"
                        color={severityConfig[r.severity]?.color ?? "neutral"}
                        className={clsx("text-xs")}
                    >
                        {r.type}
                    </Badge>
                ))}
            </div>

            {/* Observation summary */}
            <p className="mb-4 line-clamp-2 text-sm text-gray-500 dark:text-dark-300">
                {student.observations}
            </p>

            <Button
                className="w-full"
                variant="outlined"
                onClick={() => onViewRestrictions(student)}
            >
                <EyeIcon className="mr-2 h-4 w-4" />
                Ver restrições
            </Button>
        </Card>
    );
}
