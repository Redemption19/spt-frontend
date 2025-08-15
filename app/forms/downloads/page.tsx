'use client'

import PensionFormOptions from '@/components/pension-forms/PensionFormOptions'

export default function DownloadsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Employee Form */}
        <PensionFormOptions
          formType="employee"
          title="Employee Registration"
          description="Register as an employee in our pension scheme"
          onlineFormComponent={null}
        />

        {/* Employer Form */}
        <PensionFormOptions
          formType="employer"
          title="Employer Registration"
          description="Register your organization as an employer"
          onlineFormComponent={null}
        />

        {/* Benefit Form */}
        <PensionFormOptions
          formType="benefit"
          title="Benefit Withdrawal"
          description="Claim your pension benefits"
          onlineFormComponent={null}
        />

        {/* Fund Porting Form */}
        <PensionFormOptions
          formType="porting"
          title="Fund Porting"
          description="Transfer your pension funds between schemes"
          onlineFormComponent={null}
        />
      </div>
    </div>
  )
}
