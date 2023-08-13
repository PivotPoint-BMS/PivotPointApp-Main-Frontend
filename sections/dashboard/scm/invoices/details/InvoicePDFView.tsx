// types
import { CompanyDetails, Invoice } from "types"
// config
import { PIVOTPOINT_API } from "config"
// react-pdf
import { Page, Text, Image, View, Document, StyleSheet, Font } from "@react-pdf/renderer"
import moment from "moment"

// imp

const InvoicePDFView = ({
  invoice,
  companyDetails,
}: {
  invoice: Invoice
  companyDetails: CompanyDetails
}) => {
  Font.register({
    family: "Public Sans",
    fonts: [
      { src: "public/fonts/PublicSans-Regular.ttf", fontWeight: "normal" },
      { src: "public/fonts/PublicSans-Bold.ttf", fontWeight: "bold" },
    ],
  })

  const styles = StyleSheet.create({
    page: {
      fontFamily: "Courier",
      padding: 15,
      paddingHorizontal: 30,
    },
    header: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 30,
    },
    logo: {
      height: 80,
      width: 80,
      mixBlendMode: "multiply",
    },
    statusView: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      gap: 5,
    },
    status: {
      fontSize: 20,
      fontWeight: "bold",
    },
    invoiceTitle: {
      fontSize: 14,
    },
    // mb-10 grid grid-cols-2
    info: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 20,
    },
  })
  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <View style={styles.header}>
          <Image
            src={`${PIVOTPOINT_API.profilePicUrl}/${companyDetails.logo}`}
            style={styles.logo}
          />
          <View style={styles.statusView}>
            <Text>
              {invoice.status === 0 && <Text style={styles.status}>Created</Text>}
              {invoice.status === 1 && <Text style={styles.status}>Pending</Text>}
              {invoice.status === 2 && <Text style={styles.status}>Paid</Text>}
              {invoice.status === 3 && <Text style={styles.status}>Completed</Text>}
              {invoice.status === 4 && <Text style={styles.status}>Overdue</Text>}
            </Text>
            <Text style={styles.invoiceTitle}>{invoice.invoiceTitle}</Text>
          </View>
        </View>
        <View style={styles.info}>
          <View style={{ display: "flex", flexDirection: "column", gap: 4, flex: 0.5 }}>
            <Text style={{ fontSize: 12, fontWeight: "bold", marginBottom: 5 }}>Invoice From</Text>
            <Text style={{ fontSize: 10 }}>{companyDetails.name}</Text>
            <Text style={{ fontSize: 10 }}>{companyDetails.address}</Text>
            <Text style={{ fontSize: 10 }}>{companyDetails.contactPhoneNum}</Text>
          </View>
          <View style={{ display: "flex", flexDirection: "column", gap: 4, flex: 0.5 }}>
            <Text style={{ fontSize: 12, fontWeight: "bold", marginBottom: 5 }}>Invoice To</Text>
            <Text style={{ fontSize: 10 }}>{invoice.clientName}</Text>
            <Text style={{ fontSize: 10 }}>{invoice.contactId}</Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 20,
          }}
        >
          <View style={{ display: "flex", flexDirection: "column", gap: 4, flex: 0.5 }}>
            <Text style={{ fontSize: 12, fontWeight: "bold", marginBottom: 5 }}>Created Date</Text>
            <Text style={{ fontSize: 10 }}>{moment(invoice.created).format("LL")}</Text>
          </View>
          <View style={{ display: "flex", flexDirection: "column", gap: 4, flex: 0.5 }}>
            <Text style={{ fontSize: 12, fontWeight: "bold", marginBottom: 5 }}>Due Date</Text>
            <Text style={{ fontSize: 10 }}>{moment(invoice.due).format("LL")}</Text>
          </View>
        </View>
        {/* Payment Method */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 20,
          }}
        >
          <View style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
            <Text style={{ fontSize: 12, fontWeight: "bold", marginBottom: 5 }}>
              Payment Method
            </Text>
            <Text style={{ fontSize: 10 }}>{invoice.paymentMethod}</Text>
          </View>
        </View>
        <Text style={{ fontSize: 12, fontWeight: "bold", marginBottom: 20 }}>Invoice Details</Text>
        {/* Items list into a table */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 20,
          }}
        >
          <View style={{ display: "flex", flexDirection: "column", gap: 4, maxWidth: 50 }}>
            <Text style={{ fontSize: 12, fontWeight: "bold", marginBottom: 5 }}>#</Text>
          </View>
          <View style={{ display: "flex", flexDirection: "column", gap: 4, flex: 0.4 }}>
            <Text style={{ fontSize: 12, fontWeight: "bold", marginBottom: 5 }}>Item</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              alignItems: "flex-end",
              flex: 0.2,
            }}
          >
            <Text style={{ fontSize: 12, fontWeight: 700, marginBottom: 5 }}>Quantity</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 4,
              flex: 0.2,
            }}
          >
            <Text style={{ fontSize: 12, fontWeight: "bold", marginBottom: 5 }}>Price</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              flex: 0.2,
              alignItems: "flex-end",
            }}
          >
            <Text style={{ fontSize: 12, fontWeight: "bold", marginBottom: 5 }}>Total</Text>
          </View>
        </View>
        {invoice.invoiceItems.map((item, i) => (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 10,
              borderBottom: "1px dashed #2e3236",
              borderColor: "gray",
              paddingBottom: 10,
            }}
          >
            <View style={{ display: "flex", flexDirection: "column", gap: 4, maxWidth: 50 }}>
              <Text style={{ fontSize: 10 }}>{i + 1}</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
                flex: 0.4,
              }}
            >
              <Text style={{ fontSize: 10, fontWeight: "bold" }}>{item.name}</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
                alignItems: "flex-end",
                flex: 0.2,
              }}
            >
              <Text style={{ fontSize: 10 }}>{item.quantity}</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
                alignItems: "flex-end",
                flex: 0.2,
              }}
            >
              <Text style={{ fontSize: 10 }}>
                {item.value} {companyDetails.currency}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: 4,
                flex: 0.2,
              }}
            >
              <Text style={{ fontSize: 10 }}>
                {item.value * item.quantity} {companyDetails.currency}
              </Text>
            </View>
          </View>
        ))}
        {/* Subtotal, Tax, Total */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 20,
          }}
        >
          <View style={{ display: "flex", flexDirection: "column", gap: 4, flex: 0.1 }}></View>
          <View style={{ display: "flex", flexDirection: "column", gap: 4, flex: 0.1 }}></View>
          <View style={{ display: "flex", flexDirection: "column", gap: 4, flex: 0.5 }}></View>
          <View style={{ display: "flex", flexDirection: "column", gap: 4, flex: 0.1 }}>
            <Text
              style={{ fontSize: 14, fontWeight: "bold", marginBottom: 5, alignItems: "flex-end" }}
            >
              Total
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              alignItems: "flex-end",
              flexDirection: "column",
              gap: 4,
              flex: 0.2,
            }}
          >
            <Text style={{ fontSize: 14 }}>
              {invoice.total} {companyDetails.currency}
            </Text>
          </View>
        </View>
        {/* Notes */}
      </Page>
    </Document>
  )
}
export default InvoicePDFView
