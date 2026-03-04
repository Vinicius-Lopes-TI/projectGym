// Import Dependencies
import {
    Dialog,
    DialogPanel,
    Transition,
    TransitionChild,
} from "@headlessui/react";
import {
    ExclamationTriangleIcon,
    HeartIcon,
    BeakerIcon,
    ScissorsIcon,
    ClockIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";

// Local Imports
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { Student } from "@/data/mock-students";

// ----------------------------------------------------------------------

interface Props {
    student: Student | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const severityConfig: Record<string, { color: "error" | "warning" | "neutral"; label: string }> = {
    high: { color: "error", label: "Alta" },
    medium: { color: "warning", label: "Média" },
    low: { color: "neutral", label: "Baixa" },
};

export function StudentRestrictionModal({ student, open, onOpenChange }: Props) {
    const navigate = useNavigate();

    const handleCreateWorkout = () => {
        onOpenChange(false);
        // navigate(`/treinos/novo/${student?.id}`);
        navigate(`/students/${student?.id}/workouts/new`);
    };

    return (
        <Transition appear show={open} as={Dialog} onClose={() => onOpenChange(false)}>
            <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:px-5">
                {/* Backdrop */}
                <TransitionChild
                    as="div"
                    enter="ease-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    className="absolute inset-0 bg-gray-900/50 dark:bg-black/40"
                />

                {/* Panel */}
                <TransitionChild
                    as={DialogPanel}
                    enter="ease-out duration-200"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-150"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                    className="scrollbar-sm relative z-10 flex w-full max-w-2xl flex-col gap-5 overflow-y-auto rounded-lg bg-white p-6 shadow-xl dark:bg-dark-700 max-h-[90vh]"
                >
                    {student && (
                        <>
                            {/* Header */}
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-500 text-lg font-bold text-white">
                                        {student.avatarInitials}
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-800 dark:text-dark-50">
                                            {student.name}
                                        </h2>
                                        <p className="text-sm text-gray-500 dark:text-dark-300">
                                            {student.age} anos · {student.experience}
                                            {student.hasAlert && (
                                                <span className="ml-2 inline-flex items-center gap-1 font-semibold text-error">
                                                    <ExclamationTriangleIcon className="h-3.5 w-3.5" />
                                                    Atenção especial
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => onOpenChange(false)}
                                    className="shrink-0 rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:text-dark-300 dark:hover:bg-dark-600 dark:hover:text-dark-100"
                                >
                                    <XMarkIcon className="h-5 w-5" />
                                </button>
                            </div>

                            <hr className="border-gray-200 dark:border-dark-600" />

                            {/* Restrictions */}
                            <section className="space-y-3">
                                <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-dark-300">
                                    <ExclamationTriangleIcon className="h-4 w-4" />
                                    Restrições
                                </h4>
                                <div className="space-y-2">
                                    {student.restrictions.map((r, i) => {
                                        const cfg = severityConfig[r.severity] ?? { color: "neutral" as const, label: "Baixa" };
                                        return (
                                            <div
                                                key={i}
                                                className="rounded-lg border border-gray-100 bg-gray-50 p-3 dark:border-dark-600 dark:bg-dark-600/40"
                                            >
                                                <div className="mb-1 flex items-center gap-2">
                                                    <Badge variant="soft" color={cfg.color} className="text-xs">
                                                        {r.type}
                                                    </Badge>
                                                    <span className="text-xs text-gray-400 dark:text-dark-300">
                                                        {cfg.label} severidade
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-700 dark:text-dark-100">{r.description}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>

                            <hr className="border-gray-200 dark:border-dark-600" />

                            {/* Health History */}
                            <section className="space-y-2">
                                <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-dark-300">
                                    <HeartIcon className="h-4 w-4" />
                                    Histórico de Saúde
                                </h4>
                                <ul className="space-y-1">
                                    {student.health.conditions.map((c, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-gray-700 dark:text-dark-100">
                                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
                                            {c}
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            {/* Medications & Surgeries */}
                            {(student.health.medications.length > 0 || student.health.surgeries.length > 0) && (
                                <>
                                    <hr className="border-gray-200 dark:border-dark-600" />
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        {student.health.medications.length > 0 && (
                                            <section className="space-y-2">
                                                <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-dark-300">
                                                    <BeakerIcon className="h-4 w-4" />
                                                    Medicamentos
                                                </h4>
                                                <ul className="space-y-1">
                                                    {student.health.medications.map((m, i) => (
                                                        <li key={i} className="text-sm text-gray-700 dark:text-dark-100">{m}</li>
                                                    ))}
                                                </ul>
                                            </section>
                                        )}
                                        {student.health.surgeries.length > 0 && (
                                            <section className="space-y-2">
                                                <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-dark-300">
                                                    <ScissorsIcon className="h-4 w-4" />
                                                    Cirurgias
                                                </h4>
                                                <ul className="space-y-1">
                                                    {student.health.surgeries.map((s, i) => (
                                                        <li key={i} className="text-sm text-gray-700 dark:text-dark-100">{s}</li>
                                                    ))}
                                                </ul>
                                            </section>
                                        )}
                                    </div>
                                </>
                            )}

                            <hr className="border-gray-200 dark:border-dark-600" />

                            {/* Habits */}
                            <section className="space-y-2">
                                <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-dark-300">
                                    <ClockIcon className="h-4 w-4" />
                                    Hábitos
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    <span className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 px-3 py-1.5 text-sm text-gray-700 dark:border-dark-500 dark:text-dark-100">
                                        🚬 {student.health.habits.smokes ? "Fumante" : "Não fuma"}
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 px-3 py-1.5 text-sm text-gray-700 dark:border-dark-500 dark:text-dark-100">
                                        🍷 {student.health.habits.drinks ? "Consome álcool" : "Não bebe"}
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 px-3 py-1.5 text-sm text-gray-700 dark:border-dark-500 dark:text-dark-100">
                                        ⚠️ {student.health.habits.hasFainted ? "Já desmaiou" : "Nunca desmaiou"}
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 px-3 py-1.5 text-sm text-gray-700 dark:border-dark-500 dark:text-dark-100">
                                        🌙 {student.health.habits.sleepHours}h de sono
                                    </span>
                                </div>
                            </section>

                            <hr className="border-gray-200 dark:border-dark-600" />

                            {/* Observations */}
                            <section className="space-y-2">
                                <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-dark-300">
                                    Observações
                                </h4>
                                <p className="rounded-lg bg-gray-50 p-3 text-sm leading-relaxed text-gray-700 dark:bg-dark-600/40 dark:text-dark-100">
                                    {student.observations}
                                </p>
                            </section>

                            {/* Footer */}
                            <div className="flex justify-end gap-3 pt-1">
                                <Button variant="outlined" onClick={() => onOpenChange(false)}>
                                    Fechar
                                </Button>
                                <Button color="primary" onClick={handleCreateWorkout}>
                                    Cadastrar treino
                                </Button>
                            </div>
                        </>
                    )}
                </TransitionChild>
            </div>
        </Transition>
    );
}
