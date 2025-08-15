"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Tier2BeneficiaryClaimPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showOtherReason, setShowOtherReason] = useState(false)
  const [showPartialAmount, setShowPartialAmount] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    
    setTimeout(() => {
      setIsSubmitting(false)
      alert("Beneficiary claim form submitted successfully!")
    }, 2000)
  }

  function handleWithdrawalReasonChange(value: string) {
    setShowOtherReason(value === 'other')
  }

  function handleWithdrawalTypeChange(value: string) {
    setShowPartialAmount(value === 'partial')
  }

  return (
    <section className="py-20">
      <div className="container-custom">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">Benefit Withdrawal Form</h1>
            <p className="text-muted-foreground">
              Please complete all the required fields to process your beneficiary claim.
            </p>
          </div>
          
          <Card className="border-t-4 border-t-primary bg-card shadow-2xl">
            <CardHeader className="space-y-2 border-b border-border pb-4">
              <CardTitle className="text-2xl font-bold text-foreground">Tier 2 Beneficiary Claim</CardTitle>
              <div className="bg-muted/50 p-4 rounded-md">
                <p className="text-sm font-medium leading-none text-foreground">
                  For Death Claim kindly provide death certificate and letters of administration where needed
                </p>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-10">
                
                {/* 1. Contributor Details */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-foreground border-b border-border pb-2">1. Contributor Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                      <label className="text-foreground font-medium block mb-2">Name of Contributor</label>
                      <Input 
                        className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                        placeholder="Enter full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-foreground font-medium block mb-2">SSNIT Number</label>
                      <Input 
                        className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                        placeholder="Enter SSNIT number"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-foreground font-medium block mb-2">Gender</label>
                      <select className="w-full h-10 px-3 bg-input border border-border text-foreground rounded-md">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-foreground font-medium block mb-2">Scheme Member ID</label>
                      <Input 
                        className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                        placeholder="Enter member ID"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-foreground font-medium block mb-2">Date of Birth</label>
                      <Input 
                        type="date"
                        className="bg-input border-border text-foreground"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-foreground font-medium block mb-2">Ghana Card ID No</label>
                      <Input 
                        className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                        placeholder="Enter Ghana Card ID"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-foreground font-medium block mb-2">Tel Number</label>
                      <Input 
                        className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                        placeholder="Enter phone number"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-foreground font-medium block mb-2">Email Address</label>
                      <Input 
                        type="email"
                        className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                        placeholder="Enter email address"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-foreground font-medium block mb-2">GPS Address</label>
                      <Input 
                        className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                        placeholder="Enter GPS address"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Withdrawal Details */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-foreground border-b border-border pb-2">2. Withdrawal Details (tick the box where applicable)</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
                      <div className="space-y-3">
                        <label className="text-foreground font-medium">Choose Scheme One:</label>
                        <div className="flex flex-col space-y-2">
                          <label className="flex items-center space-x-2">
                            <input type="radio" name="scheme" value="best-master-trust" className="rounded-full" />
                            <span className="text-foreground">Best Master Trust</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input type="radio" name="scheme" value="best-provident-fund" className="rounded-full" />
                            <span className="text-foreground">Best Provident Fund</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input type="radio" name="scheme" value="best-pension-fund" className="rounded-full" />
                            <span className="text-foreground">Best Pension Fund</span>
                          </label>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <label className="text-foreground font-medium">Type of Withdrawal:</label>
                        <div className="flex flex-col space-y-2">
                          <label className="flex items-center space-x-2">
                            <input 
                              type="radio" 
                              name="withdrawalType" 
                              value="full" 
                              className="rounded-full"
                              onChange={() => handleWithdrawalTypeChange('full')}
                            />
                            <span className="text-foreground">Full withdrawal</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input 
                              type="radio" 
                              name="withdrawalType" 
                              value="partial" 
                              className="rounded-full"
                              onChange={() => handleWithdrawalTypeChange('partial')}
                            />
                            <span className="text-foreground">Partial Withdrawal GHS</span>
                          </label>
                          {showPartialAmount && (
                            <div className="ml-6">
                              <Input 
                                className="w-32 bg-input border-border text-foreground" 
                                placeholder="Enter amount" 
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <label className="text-foreground font-medium">Reason for the Withdrawal:</label>
                        <div className="flex flex-col space-y-2">
                          <label className="flex items-center space-x-2">
                            <input 
                              type="radio" 
                              name="withdrawalReason" 
                              value="retirement-60" 
                              className="rounded-full"
                              onChange={() => handleWithdrawalReasonChange('retirement-60')}
                            />
                            <span className="text-foreground">a. Retirement @60</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input 
                              type="radio" 
                              name="withdrawalReason" 
                              value="resignation" 
                              className="rounded-full"
                              onChange={() => handleWithdrawalReasonChange('resignation')}
                            />
                            <span className="text-foreground">b. Resignation</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input 
                              type="radio" 
                              name="withdrawalReason" 
                              value="early-retirement" 
                              className="rounded-full"
                              onChange={() => handleWithdrawalReasonChange('early-retirement')}
                            />
                            <span className="text-foreground">c. Early Retirement</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input 
                              type="radio" 
                              name="withdrawalReason" 
                              value="termination" 
                              className="rounded-full"
                              onChange={() => handleWithdrawalReasonChange('termination')}
                            />
                            <span className="text-foreground">b. Termination</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input 
                              type="radio" 
                              name="withdrawalReason" 
                              value="total-incapacity" 
                              className="rounded-full"
                              onChange={() => handleWithdrawalReasonChange('total-incapacity')}
                            />
                            <span className="text-foreground">d. Total Incapacity</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input 
                              type="radio" 
                              name="withdrawalReason" 
                              value="permanent-emigration" 
                              className="rounded-full"
                              onChange={() => handleWithdrawalReasonChange('permanent-emigration')}
                            />
                            <span className="text-foreground">d. Permanent Emigration from Ghana</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input 
                              type="radio" 
                              name="withdrawalReason" 
                              value="other" 
                              className="rounded-full"
                              onChange={() => handleWithdrawalReasonChange('other')}
                            />
                            <span className="text-foreground">Other:</span>
                          </label>
                          {showOtherReason && (
                            <div className="ml-6">
                              <Input 
                                className="bg-input border-border text-foreground placeholder:text-muted-foreground" 
                                placeholder="Specify other reason" 
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="text-foreground font-medium block mb-2">Employer Sponsored Scheme:</label>
                      <Input 
                        className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                        placeholder="Enter employer sponsored scheme details"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Payment Details */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-foreground border-b border-border pb-2">3. Payment Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-foreground font-medium block mb-2">Name on Account:</label>
                      <Input 
                        className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                        placeholder="Enter name on account"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-foreground font-medium block mb-2">Bank Name:</label>
                      <Input 
                        className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                        placeholder="Enter bank name"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-foreground font-medium block mb-2">Account Number:</label>
                      <Input 
                        className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                        placeholder="Enter account number"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-foreground font-medium block mb-2">Branch:</label>
                      <Input 
                        className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                        placeholder="Enter branch name"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Member Declaration */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-foreground border-b border-border pb-2">4. Member Declaration</h3>
                  <div className="p-6 border border-border rounded-md bg-muted/20">
                    <div className="space-y-2">
                      <p className="text-foreground">
                        I <span className="border-b border-dashed px-3">____________________</span> certify that the information provided on this 
                        form is correct and complete. I further authorize the Trustee of the scheme to process and pay my benefits to the 
                        bank account details I have indicated above. I understand that I will be liable to prosecution for any false declarations.
                      </p>
                      <div className="flex items-center space-x-2 mt-4">
                        <input 
                          type="checkbox" 
                          id="memberDeclaration"
                          className="rounded border-border"
                          required
                        />
                        <label htmlFor="memberDeclaration" className="font-normal text-foreground">
                          I confirm the above declaration
                        </label>
                      </div>
                      <div className="flex justify-between mt-4">
                        <div className="border-t border-dashed pt-1 w-32">
                          <span className="text-sm text-muted-foreground">Signature</span>
                        </div>
                        <div className="border-t border-dashed pt-1 w-32">
                          <span className="text-sm text-muted-foreground">Date</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Death Claim Section - Beneficiary Details */}
                <div className="space-y-6 border border-border rounded-md p-6 bg-muted/20">
                  <h3 className="text-xl font-semibold text-foreground">Name of Beneficiary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                      <label className="text-foreground font-medium block mb-2">Name of Beneficiary</label>
                      <Input 
                        className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                        placeholder="Enter beneficiary name"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-foreground font-medium block mb-2">Relationship with deceased</label>
                      <Input 
                        className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                        placeholder="Enter relationship"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-foreground font-medium block mb-2">Gender</label>
                      <select className="w-full h-10 px-3 bg-input border border-border text-foreground rounded-md">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-foreground font-medium block mb-2">Ghana Card ID No</label>
                      <Input 
                        className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                        placeholder="Enter Ghana Card ID"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-foreground font-medium block mb-2">Date of Birth</label>
                      <Input 
                        type="date"
                        className="bg-input border-border text-foreground"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-foreground font-medium block mb-2">GPS Address</label>
                      <Input 
                        className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                        placeholder="Enter GPS address"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-foreground font-medium block mb-2">Tel Number</label>
                      <Input 
                        className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                        placeholder="Enter phone number"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-foreground font-medium block mb-2">Email Address</label>
                      <Input 
                        type="email"
                        className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                        placeholder="Enter email address"
                        required
                      />
                    </div>
                  </div>

                  {/* 5. Claimant Declaration */}
                  <div className="space-y-4 mt-8">
                    <h4 className="text-lg font-semibold text-foreground">5. Claimant Declaration</h4>
                    <div className="space-y-2">
                      <p className="text-foreground">
                        I <span className="border-b border-dashed px-3">____________________</span> certify that the information provided on this 
                        form is correct and complete. I further authorize the Trustee of the scheme to process and pay any benefits 
                        assigned to me by the deceased to the bank account details I have indicated above. I understand that I will be 
                        liable to prosecution for any false declarations.
                      </p>
                      <div className="flex items-center space-x-2 mt-4">
                        <input 
                          type="checkbox" 
                          id="claimantDeclaration"
                          className="rounded border-border"
                          required
                        />
                        <label htmlFor="claimantDeclaration" className="font-normal text-foreground">
                          I confirm the above declaration
                        </label>
                      </div>
                      <div className="flex justify-between mt-4">
                        <div className="border-t border-dashed pt-1 w-32">
                          <span className="text-sm text-muted-foreground">Signature</span>
                        </div>
                        <div className="border-t border-dashed pt-1 w-32">
                          <span className="text-sm text-muted-foreground">Date</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 6. EMPLOYER SECTION */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-foreground border-b border-border pb-2">6. EMPLOYER SECTION (for employer's official use only)</h3>
                  <div className="space-y-6 border border-border rounded-md p-6 bg-muted/20">
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-foreground">Vesting Provision (Provident Fund Withdrawals)</h4>
                      <div className="space-y-3">
                        <label className="text-foreground font-medium">Is the Employee vested in the Employer Contributions</label>
                        <div className="flex items-center space-x-6">
                          <label className="flex items-center space-x-2">
                            <input type="radio" name="isVested" value="yes" className="rounded-full" />
                            <span className="text-foreground">YES</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input type="radio" name="isVested" value="no" className="rounded-full" />
                            <span className="text-foreground">NO</span>
                          </label>
                        </div>
                      </div>
                      <div>
                        <label className="text-foreground font-medium block mb-2">If Yes kindly give reasons:</label>
                        <textarea 
                          className="w-full min-h-[80px] px-3 py-2 bg-input border border-border text-foreground placeholder:text-muted-foreground rounded-md"
                          placeholder="Enter reasons for vesting"
                        ></textarea>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-foreground font-medium block mb-2">Name of Employer:</label>
                        <Input 
                          className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                          placeholder="Enter employer name"
                        />
                      </div>
                      <div>
                        <label className="text-foreground font-medium block mb-2">Tel. Number:</label>
                        <Input 
                          className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                          placeholder="Enter telephone number"
                        />
                      </div>
                      <div>
                        <label className="text-foreground font-medium block mb-2">Email Address:</label>
                        <Input 
                          type="email"
                          className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                          placeholder="Enter email address"
                        />
                      </div>
                      <div>
                        <label className="text-foreground font-medium block mb-2">GPS Address:</label>
                        <Input 
                          className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                          placeholder="Enter GPS address"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="text-center">
                          <div className="border-t border-dashed pt-1 w-full mb-4">
                            <span className="text-sm text-muted-foreground">Finance Officer</span>
                          </div>
                          <div className="border-t border-dashed pt-1 w-full mb-4">
                            <span className="text-sm text-muted-foreground">Signature</span>
                          </div>
                          <div className="border-t border-dashed pt-1 w-full">
                            <span className="text-sm text-muted-foreground">Date</span>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="border-t border-dashed pt-1 w-full mb-4">
                            <span className="text-sm text-muted-foreground">Human Resource Officer</span>
                          </div>
                          <div className="border-t border-dashed pt-1 w-full mb-4">
                            <span className="text-sm text-muted-foreground">Signature</span>
                          </div>
                          <div className="border-t border-dashed pt-1 w-full">
                            <span className="text-sm text-muted-foreground">Date</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        <strong>NB:</strong> Please return this form signed by either one of the signatories above.
                      </p>
                      <div>
                        <label className="text-foreground font-medium block mb-2">I __________ in the capacity as __________</label>
                        <Input 
                          className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                          placeholder="Enter capacity details"
                        />
                      </div>
                      <p className="text-foreground">certify that the information provided on this form is correct and</p>
                    </div>
                  </div>
                </div>

                {/* OFFICIAL USE ONLY */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-foreground border-b border-border pb-2">OFFICIAL USE ONLY</h3>
                  <div className="border border-border rounded-md bg-muted/20">
                    <div className="grid grid-cols-3 gap-0">
                      <div className="border-r border-border p-4 text-center">
                        <span className="text-foreground font-medium">Verified By Client Service Executive</span>
                      </div>
                      <div className="border-r border-border p-4 text-center">
                        <span className="text-foreground font-medium">Signature</span>
                      </div>
                      <div className="p-4 text-center">
                        <span className="text-foreground font-medium">Date</span>
                      </div>
                      <div className="border-r border-border border-t border-border p-4">
                        <Input 
                          className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                          placeholder="Enter name"
                        />
                      </div>
                      <div className="border-r border-border border-t border-border p-4">
                        <div className="h-12 border-b border-dashed"></div>
                      </div>
                      <div className="border-t border-border p-4">
                        <Input 
                          type="date"
                          className="bg-input border-border text-foreground"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-lg font-semibold"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Beneficiary Claim"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
} 