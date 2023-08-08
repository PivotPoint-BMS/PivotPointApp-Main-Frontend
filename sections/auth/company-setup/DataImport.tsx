import React, { useState } from "react"
// framer motion
import { motion } from "framer-motion"
// api
import { useCreationStepFiveMutation } from "store/api/auth/companyApi"
// hooks
import useTranslate from "hooks/useTranslate"
import useSnackbar from "hooks/useSnackbar"
// components
import { Importer, ImporterField } from "react-csv-importer"
import { MotionContainer } from "components/animate"
import { varFade } from "components/animate/variants"
import Button from "components/Button"

export default function DataImport({ handleNext }: { handleNext: () => void }) {
  const { t } = useTranslate()
  const { open } = useSnackbar()
  const [leadsCSV, setLeadsCSV] = useState<File | null>(null)
  // const [productsCSV, setProductsCSV] = useState<File | null>(null)
  // const [suppliersCSV, setSuppliersCSV] = useState<File | null>(null)

  // Mutations
  const [creationStepFive, { isLoading }] = useCreationStepFiveMutation()

  const sendCSV = async () => {
    if (leadsCSV === null) {
      handleNext()
      return
    }
    const formData = new FormData()
    if (leadsCSV) formData.append("Contacts", leadsCSV)
    // if (productsCSV) formData.append("Products", productsCSV)
    // if (suppliersCSV) formData.append("Suppliers", suppliersCSV)
    await creationStepFive(formData)
    handleNext()

    creationStepFive(formData)
      .unwrap()
      .then(() => {
        handleNext()
      })
      .catch(() => {
        open({
          message: t("A problem has occurred."),
          autoHideDuration: 6000,
          type: "error",
          variant: "contained",
        })
      })
  }
  return (
    <MotionContainer>
      <div className='mx-auto flex h-full min-w-[600px] flex-col items-center justify-center gap-5 rounded-xl px-10 py-10 lg:w-3/4'>
        <motion.div
          variants={varFade().in}
          className='flex h-full w-full flex-col items-center gap-6'
        >
          <h1 className='text-3xl font-semibold'>{t("Data Import")}</h1>
          <p className='text-center text-gray-600 dark:text-gray-300'>
            {t("Import your leads, contacts, products, services, and suppliers from a CSV file.")}
          </p>
          <div className='flex w-full justify-start'>
            <h6 className='text-left'>{t("Import Leads & Contacts")}</h6>
          </div>

          <Importer
            dataHandler={async (rows) => {
              const defaultValues = {
                firstName: "",
                lastName: "",
                email: "email@email.com",
                phoneNumber: "0",
                jobTitle: "worker",
                leadSource: "website",
                city: "algiers",
                country: "algeria",
                spendingScore: "50",
                incomeK: "50",
                birthDate: "01/01/2000",
              }
              const newRows = rows.map((row) => {
                const newRow = { ...defaultValues, ...row }
                return newRow
              })

              const header = Object.keys(defaultValues).join(",")
              const csv = newRows.map((row) => Object.values(row).join(","))
              const csvString = csv.join("\n")
              const csvStringWithHeader = `${header}\n${csvString}`
              const csvFile = new File([csvStringWithHeader], "leads.csv", {
                type: "text/csv",
              })
              setLeadsCSV(csvFile)
            }}
            chunkSize={100000000}
            defaultNoHeader={false}
            restartable={false}
            skipEmptyLines={true}
          >
            <ImporterField name='firstName' label={t("First Name")} />
            <ImporterField name='lastName' optional label={t("Last Name")} />
            <ImporterField name='email' label={t("Email")} />
            <ImporterField name='phoneNumber' label={t("Phone Number")} />
            <ImporterField name='jobTitle' optional label={t("Job Title")} />
            <ImporterField name='leadSource' optional label={t("Lead Source")} />
            <ImporterField name='city' optional label={t("City")} />
            <ImporterField name='country' optional label={t("Country")} />
            <ImporterField name='spendingScore' optional label={t("Spending Score")} />
            <ImporterField name='incomeK' optional label={t("Income Score")} />
            <ImporterField name='birthDate' optional label={t("Birth Date")} />
          </Importer>
          {/* <div className='flex w-full justify-start'>
            <h6 className='text-left'>{t("Import Products & Services")}</h6>
          </div>

          <Importer
            dataHandler={async (rows) => {
              console.log("received batch of rows", rows)
            }}
            chunkSize={100000000}
            defaultNoHeader={false}
            restartable={false}
            skipEmptyLines={true}
            onComplete={({ file }) => {
              setProductsCSV(file)
            }}
          >
            <ImporterField name='name' label={t("Name")} />
            <ImporterField name='category' label={t("Category")} />
            <ImporterField name='price' optional label={t("Price")} />
            <ImporterField name='type' label={t("Type")} />
            <ImporterField name='productCode' optional label={t("Code")} />
            <ImporterField name='cost' optional label={t("Cost")} />
            <ImporterField name='brand' optional label={t("Brand")} />
            <ImporterField name='weight' optional label={t("Weight")} />
            <ImporterField name='height' optional label={t("Height")} />
            <ImporterField name='length' optional label={t("Length")} />
            <ImporterField name='width' optional label={t("Width")} />
          </Importer>
          <div className='flex w-full justify-start'>
            <h6 className='text-left'>{t("Import Suppliers")}</h6>
          </div>

          <Importer
            dataHandler={async (rows) => {
              console.log(rows)
            }}
            chunkSize={100000000}
            defaultNoHeader={false}
            restartable={false}
            skipEmptyLines={true}
            onComplete={({ file }) => {
              setSuppliersCSV(file)
            }}
          >
            <ImporterField name='name' label={t("Full Name")} />
            <ImporterField name='address' label={t("Email")} />
            <ImporterField name='email' label={t("Phone Number")} />
            <ImporterField name='phoneNumber' optional label={t("Job Title")} />
          </Importer> */}
        </motion.div>
        <Button className='w-1/3 self-end' loading={isLoading} onClick={sendCSV}>
          {t("Next")}
        </Button>
      </div>
    </MotionContainer>
  )
}
