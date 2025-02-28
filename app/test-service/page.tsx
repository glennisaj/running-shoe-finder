"use client"

import { useState, useEffect } from "react"
import { getAllShoes, getShoeById, getShoesByFilters } from "@/services/shoe-service"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestServicePage() {
  const [testResults, setTestResults] = useState<{ 
    test: string; 
    status: "success" | "error" | "running"; 
    data?: any;
    error?: string;
  }[]>([])
  
  const runTest = async (name: string, testFn: () => Promise<any>) => {
    setTestResults(prev => [...prev, { test: name, status: "running" }])
    
    try {
      const result = await testFn()
      setTestResults(prev => 
        prev.map(item => 
          item.test === name 
            ? { test: name, status: "success", data: result } 
            : item
        )
      )
    } catch (error) {
      setTestResults(prev => 
        prev.map(item => 
          item.test === name 
            ? { test: name, status: "error", error: String(error) } 
            : item
        )
      )
    }
  }
  
  const runAllTests = () => {
    setTestResults([])
    
    // Test 1: Get All Shoes
    runTest("Get All Shoes", async () => {
      const shoes = await getAllShoes()
      if (shoes.length === 0) throw new Error("No shoes returned")
      return `Received ${shoes.length} shoes`
    })
    
    // Test 2: Get Shoe By ID
    runTest("Get Shoe By ID", async () => {
      // Use the first shoe's ID from shoesData, typically "1"
      const shoe = await getShoeById("1")
      if (!shoe) throw new Error("No shoe returned")
      return `Found shoe: ${shoe.name}`
    })
    
    // Test 3: Filter Shoes
    runTest("Filter Shoes", async () => {
      const filtered = await getShoesByFilters({
        primaryUse: "daily-trainer",
        support: "neutral"
      })
      return `Found ${filtered.length} matching shoes`
    })
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Service Test Page</h1>
      
      <div className="mb-8">
        <Button onClick={runAllTests}>Run All Tests</Button>
      </div>
      
      <div className="space-y-4">
        {testResults.map((result, index) => (
          <Card key={index}>
            <CardHeader className={`
              ${result.status === "success" ? "bg-green-50" : 
                result.status === "error" ? "bg-red-50" : "bg-blue-50"}
            `}>
              <CardTitle className="flex items-center text-lg">
                <span className={`
                  h-3 w-3 rounded-full mr-2
                  ${result.status === "success" ? "bg-green-500" : 
                    result.status === "error" ? "bg-red-500" : "bg-blue-500"}
                `} />
                {result.test}
                {result.status === "running" && <span className="ml-2">(Running...)</span>}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              {result.status === "success" && (
                <div>
                  <p className="text-green-700 mb-2">{result.data}</p>
                  <pre className="bg-gray-100 p-2 rounded text-xs max-h-40 overflow-auto">
                    {typeof result.data === 'object' ? 
                      JSON.stringify(result.data, null, 2) : result.data}
                  </pre>
                </div>
              )}
              {result.status === "error" && (
                <p className="text-red-700">{result.error}</p>
              )}
              {result.status === "running" && (
                <p className="text-blue-700">Test in progress...</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}