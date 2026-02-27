// Import Dependencies
import { FormEvent, useState } from "react";

// Local Imports
import { Page } from "@/components/shared/Page";
import { Button, Card, Checkbox } from "@/components/ui";
import { Textarea } from "@/components/ui/Form/Textarea";

// ----------------------------------------------------------------------

type ExperienceLevel = "" | "nunca" | "passado" | "atual";

type YesNo = "" | "sim" | "nao";

const PHYSICAL_RESTRICTIONS = [
  "Problemas no joelho",
  "Problemas no ombro",
  "Problemas na coluna",
  "Lesão muscular recente",
  "Arritmia",
  "Hipertensão",
  "Outro",
] as const;

function SectionTitle({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="space-y-1">
      <h2 className="text-base font-semibold text-gray-700 dark:text-dark-50">
        {title}
      </h2>
      {description ? (
        <p className="text-xs text-gray-400 dark:text-dark-300">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export default function StudentHealthPage() {
  const [physicalRestrictions, setPhysicalRestrictions] = useState<string[]>(
    [],
  );
  const [otherRestriction, setOtherRestriction] = useState("");
  const [notes, setNotes] = useState("");
  const [experience, setExperience] = useState<ExperienceLevel>("");
  const [habits, setHabits] = useState({
    alcool: false,
    fuma: false,
    poucoSono: false,
  });
  const [healthHistory, setHealthHistory] = useState<{
    desmaios: YesNo;
    liberacaoMedica: YesNo;
  }>({
    desmaios: "",
    liberacaoMedica: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const handleToggleRestriction = (label: (typeof PHYSICAL_RESTRICTIONS)[number]) => {
    setPhysicalRestrictions((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label],
    );
    if (label === "Outro" && physicalRestrictions.includes("Outro")) {
      setOtherRestriction("");
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitMessage(null);

    if (!experience || !healthHistory.desmaios || !healthHistory.liberacaoMedica) {
      setSubmitMessage(
        "Por favor, preencha sua experiência e o histórico de saúde antes de salvar.",
      );
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage("Informações salvas (mock). Seu professor usará esses dados para montar seu treino.");
    }, 800);
  };

  const isRestrictionSelected = (label: (typeof PHYSICAL_RESTRICTIONS)[number]) =>
    physicalRestrictions.includes(label);

  return (
    <Page title="Saúde e histórico">
      <main className="min-h-100vh grid w-full grow grid-cols-1 place-items-center">
        <div className="w-full max-w-[32rem] p-4 sm:px-5">
          <div className="text-center mb-4">
            <h1 className="text-2xl font-semibold text-gray-700 dark:text-dark-50">
              Informações de saúde
            </h1>
            <p className="mt-1 text-sm text-gray-400 dark:text-dark-300">
              Essas informações ajudam seu professor a montar um treino seguro e adequado para você.
            </p>
          </div>

          <Card className="rounded-lg p-5 lg:p-7">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <section className="space-y-3">
                <SectionTitle
                  title="Restrições físicas"
                  description="Selecione todas as opções que se aplicam a você."
                />
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {PHYSICAL_RESTRICTIONS.map((label) => {
                    const selected = isRestrictionSelected(label);
                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={() => handleToggleRestriction(label)}
                        className={
                          "rounded-md border px-3 py-2 text-left text-sm transition-colors " +
                          (selected
                            ? "border-primary-500 bg-primary-50 text-primary-900 dark:border-primary-400 dark:bg-primary-950/40"
                            : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 dark:border-dark-500 dark:bg-dark-700 dark:text-dark-50")
                        }
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
                {isRestrictionSelected("Outro") && (
                  <div className="mt-2">
                    <Textarea
                      label="Outro"
                      placeholder="Descreva outra restrição ou cuidado importante"
                      value={otherRestriction}
                      onChange={(event: any) => setOtherRestriction(event.target.value)}
                      description="Use este campo apenas se tiver alguma outra restrição não listada acima."
                      rows={3}
                    />
                  </div>
                )}
              </section>

              <section className="space-y-3">
                <SectionTitle
                  title="Observações"
                  description="Você pode descrever dores específicas, cirurgias ou qualquer informação importante. Este campo é opcional."
                />
                <Textarea
                  label="Observações"
                  placeholder="Descreva qualquer limitação ou informação importante"
                  value={notes}
                  onChange={(event: any) => setNotes(event.target.value)}
                  rows={4}
                />
              </section>

              <section className="space-y-3">
                <SectionTitle
                  title="Experiência com treino"
                  description="Escolha apenas uma opção."
                />
                <div className="space-y-2">
                  {[
                    { value: "nunca", label: "Nunca treinei" },
                    { value: "passado", label: "Já treinei no passado" },
                    { value: "atual", label: "Treino atualmente" },
                  ].map((option) => {
                    const selected = experience === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setExperience(option.value as ExperienceLevel)}
                        className={
                          "flex w-full items-center justify-between rounded-md border px-3 py-2 text-left text-sm transition-colors " +
                          (selected
                            ? "border-primary-500 bg-primary-50 text-primary-900 dark:border-primary-400 dark:bg-primary-950/40"
                            : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 dark:border-dark-500 dark:bg-dark-700 dark:text-dark-50")
                        }
                      >
                        <span>{option.label}</span>
                        <span
                          className={
                            "size-4 rounded-full border " +
                            (selected
                              ? "border-primary-500 bg-primary-500"
                              : "border-gray-300 bg-white dark:border-dark-400 dark:bg-dark-700")
                          }
                        />
                      </button>
                    );
                  })}
                </div>
              </section>

              <section className="space-y-3">
                <SectionTitle
                  title="Hábitos"
                  description="Essas informações ajudam a entender melhor sua rotina."
                />
                <div className="space-y-2">
                  <Checkbox
                    label="Consome bebida alcoólica"
                    checked={habits.alcool}
                    onChange={(event) =>
                      setHabits((prev) => ({ ...prev, alcool: event.target.checked }))
                    }
                  />
                  <Checkbox
                    label="Fuma"
                    checked={habits.fuma}
                    onChange={(event) =>
                      setHabits((prev) => ({ ...prev, fuma: event.target.checked }))
                    }
                  />
                  <Checkbox
                    label="Dorme menos de 6h por noite"
                    checked={habits.poucoSono}
                    onChange={(event) =>
                      setHabits((prev) => ({ ...prev, poucoSono: event.target.checked }))
                    }
                  />
                </div>
              </section>

              <section className="space-y-3">
                <SectionTitle
                  title="Histórico de saúde"
                  description="Informações importantes para sua segurança durante o treino."
                />
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <p className="text-sm font-medium text-gray-700 dark:text-dark-50">
                      Já teve desmaios?
                    </p>
                    <div className="flex gap-3">
                      {[
                        { value: "sim", label: "Sim" },
                        { value: "nao", label: "Não" },
                      ].map((option) => {
                        const selected = healthHistory.desmaios === option.value;
                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() =>
                              setHealthHistory((prev) => ({
                                ...prev,
                                desmaios: option.value as YesNo,
                              }))
                            }
                            className={
                              "flex flex-1 items-center justify-between rounded-md border px-3 py-2 text-left text-sm transition-colors " +
                              (selected
                                ? "border-primary-500 bg-primary-50 text-primary-900 dark:border-primary-400 dark:bg-primary-950/40"
                                : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 dark:border-dark-500 dark:bg-dark-700 dark:text-dark-50")
                            }
                          >
                            <span>{option.label}</span>
                            <span
                              className={
                                "size-4 rounded-full border " +
                                (selected
                                  ? "border-primary-500 bg-primary-500"
                                  : "border-gray-300 bg-white dark:border-dark-400 dark:bg-dark-700")
                              }
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <p className="text-sm font-medium text-gray-700 dark:text-dark-50">
                      Possui liberação médica para treinar?
                    </p>
                    <div className="flex gap-3">
                      {[
                        { value: "sim", label: "Sim" },
                        { value: "nao", label: "Não" },
                      ].map((option) => {
                        const selected = healthHistory.liberacaoMedica === option.value;
                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() =>
                              setHealthHistory((prev) => ({
                                ...prev,
                                liberacaoMedica: option.value as YesNo,
                              }))
                            }
                            className={
                              "flex flex-1 items-center justify-between rounded-md border px-3 py-2 text-left text-sm transition-colors " +
                              (selected
                                ? "border-primary-500 bg-primary-50 text-primary-900 dark:border-primary-400 dark:bg-primary-950/40"
                                : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 dark:border-dark-500 dark:bg-dark-700 dark:text-dark-50")
                            }
                          >
                            <span>{option.label}</span>
                            <span
                              className={
                                "size-4 rounded-full border " +
                                (selected
                                  ? "border-primary-500 bg-primary-500"
                                  : "border-gray-300 bg-white dark:border-dark-400 dark:bg-dark-700")
                              }
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </section>

              {submitMessage && (
                <div className="rounded-md bg-gray-50 p-3 text-sm text-gray-700 dark:bg-dark-700 dark:text-dark-50">
                  {submitMessage}
                </div>
              )}

              <div className="mt-4 flex flex-col gap-3 sm:flex-row-reverse">
                <Button
                  type="submit"
                  className="w-full sm:w-auto sm:flex-1"
                  color="primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Salvando..." : "Salvar informações"}
                </Button>
                <Button
                  type="button"
                  className="w-full sm:w-auto sm:flex-1"
                  variant="outlined"
                  onClick={() => window.history.back()}
                >
                  Voltar
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </main>
    </Page>
  );
}

