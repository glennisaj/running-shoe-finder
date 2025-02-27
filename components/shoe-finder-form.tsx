"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"

type FormStep = {
  id: string
  title: string
  description: string
  options: {
    value: string
    label: string
    description?: string
  }[]
}

const formSteps: FormStep[] = [
  {
    id: "primaryUse",
    title: "Primary use of shoe",
    description: "What will you mainly use these shoes for?",
    options: [
      { value: "daily-trainer", label: "Daily Trainer", description: "For regular training runs" },
      { value: "race-day", label: "Race Day", description: "For competition and speed" },
      { value: "recovery", label: "Recovery", description: "For easy, comfortable runs" },
      { value: "tempo-run", label: "Tempo Run", description: "For those runs where you need to pick up the pace" },
      { value: "beginner", label: "Beginner Runner", description: "For those new to running" },
    ],
  },
  {
    id: "distance",
    title: "What distances are you looking to run?",
    description: "Select your typical or target running distance",
    options: [
      { value: "any", label: "Daily Trainers", description: "Versatile for various distances" },
      { value: "5-10k", label: "5-10K", description: "Short to medium distances" },
      { value: "long-runs", label: "Long Runs", description: "Half marathon and longer training" },
      { value: "marathons", label: "Marathons", description: "Marathon training and racing" },
    ],
  },
  {
    id: "support",
    title: "What type of support do you need?",
    description: "Based on your foot mechanics and running style",
    options: [
      { value: "neutral", label: "Neutral", description: "For normal pronation" },
      { value: "stability", label: "Stability", description: "For overpronation" },
      { value: "not sure", label: "Not Sure", description: "If you're unsure about your pronation" },
    ],
  },
  {
    id: "stack",
    title: "What stack height do you prefer?",
    description: "The amount of cushioning between your foot and the ground",
    options: [
      { value: "high", label: "High", description: "Maximum cushioning" },
      { value: "medium", label: "Medium", description: "Balanced cushioning" },
      { value: "low", label: "Low", description: "Minimal cushioning" },
      { value: "not sure", label: "Not Sure", description: "If you don't have a preference" },
    ],
  },
]

export default function ShoeFinderForm() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<Record<string, string>>({})

  const handleOptionSelect = (value: string) => {
    setFormData({
      ...formData,
      [formSteps[currentStep].id]: value,
    })
  }

  const goToNextStep = () => {
    if (currentStep < formSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Submit form and navigate to results
      const params = new URLSearchParams()
      Object.entries(formData).forEach(([key, value]) => {
        params.append(key, value)
      })
      router.push(`/results?${params.toString()}`)
    }
  }

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const currentStepData = formSteps[currentStep]
  const isLastStep = currentStep === formSteps.length - 1
  const isOptionSelected = formData[currentStepData.id] !== undefined

  return (
    <div id="shoe-finder" className="max-w-2xl mx-auto">
      <Card className="border-2">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {formSteps.length}
            </div>
            <div className="flex gap-1">
              {formSteps.map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 w-6 rounded-full ${
                    index === currentStep ? "bg-primary" : index < currentStep ? "bg-primary/60" : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>
          <CardTitle className="text-2xl">{currentStepData.title}</CardTitle>
          <CardDescription>{currentStepData.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={formData[currentStepData.id]} onValueChange={handleOptionSelect} className="space-y-3">
            {currentStepData.options.map((option) => (
              <div key={option.value} className="flex items-start space-x-2">
                <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor={option.value} className="text-base font-medium cursor-pointer">
                    {option.label}
                  </Label>
                  {option.description && <p className="text-sm text-muted-foreground">{option.description}</p>}
                </div>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={goToPreviousStep} disabled={currentStep === 0} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <Button onClick={goToNextStep} disabled={!isOptionSelected} className="gap-2">
            {isLastStep ? (
              <>
                Find Shoes
                <Check className="h-4 w-4" />
              </>
            ) : (
              <>
                Next
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

