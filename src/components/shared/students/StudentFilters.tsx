// Import Dependencies
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

// Local Imports
import { RESTRICTION_TYPES, EXPERIENCE_LEVELS } from "@/data/mock-students";

// ----------------------------------------------------------------------

interface Props {
    search: string;
    onSearchChange: (value: string) => void;
    restrictionFilter: string;
    onRestrictionFilterChange: (value: string) => void;
    experienceFilter: string;
    onExperienceFilterChange: (value: string) => void;
}

export function StudentFilters({
    search,
    onSearchChange,
    restrictionFilter,
    onRestrictionFilterChange,
    experienceFilter,
    onExperienceFilterChange,
}: Props) {
    return (
        <div className="flex flex-col gap-3 sm:flex-row">
            {/* Search */}
            <div className="relative flex-1">
                <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-dark-300" />
                <input
                    type="text"
                    placeholder="Buscar aluno por nome..."
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="h-9 w-full rounded-lg border border-gray-200 bg-white pl-9 pr-3 text-sm text-gray-700 placeholder-gray-400 outline-none transition-colors focus:border-primary-400 focus:ring-1 focus:ring-primary-400 dark:border-dark-500 dark:bg-dark-700 dark:text-dark-50 dark:placeholder-dark-300 dark:focus:border-primary-500"
                />
            </div>

            {/* Restriction filter */}
            <select
                value={restrictionFilter}
                onChange={(e) => onRestrictionFilterChange(e.target.value)}
                className="h-9 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition-colors focus:border-primary-400 focus:ring-1 focus:ring-primary-400 dark:border-dark-500 dark:bg-dark-700 dark:text-dark-50 sm:w-52"
            >
                <option value="all">Todas restrições</option>
                {RESTRICTION_TYPES.map((type) => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </select>

            {/* Experience filter */}
            <select
                value={experienceFilter}
                onChange={(e) => onExperienceFilterChange(e.target.value)}
                className="h-9 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition-colors focus:border-primary-400 focus:ring-1 focus:ring-primary-400 dark:border-dark-500 dark:bg-dark-700 dark:text-dark-50 sm:w-48"
            >
                <option value="all">Todos os níveis</option>
                {EXPERIENCE_LEVELS.map((level) => (
                    <option key={level} value={level}>
                        {level}
                    </option>
                ))}
            </select>
        </div>
    );
}
