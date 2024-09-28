import FormBuilding from "../../pages/ADMIN/MASTER/Building/form";
import FormCustomer from "../../pages/ADMIN/MASTER/Customer/form";
import FormDepartment from "../../pages/ADMIN/MASTER/Department/form";
import FormEquipment from "../../pages/ADMIN/MASTER/Equipment/form";
import FormEquipmentType from "../../pages/ADMIN/MASTER/EquipmentType/form";
import FormFormula from "../../pages/ADMIN/MASTER/Formula/form";
import FormFormulaTableRef from "../../pages/ADMIN/MASTER/FormulaTableRef/form";
import FormLabour from "../../pages/ADMIN/MASTER/Labour/form";
import FormManufacture from "../../pages/ADMIN/MASTER/Manufacture/form";
import FormOtherExpense from "../../pages/ADMIN/MASTER/OtherExpense/form";
import FormPackingType from "../../pages/ADMIN/MASTER/PackingType/form";
import FormParameter from "../../pages/ADMIN/MASTER/Parameter/form";
import FormParameterCategory from "../../pages/ADMIN/MASTER/ParameterCategory/form";
import FormProduct from "../../pages/ADMIN/MASTER/Product/form";
import FormProductCategory from "../../pages/ADMIN/MASTER/ProductCategory/form";
import FormProductType from "../../pages/ADMIN/MASTER/ProductType/form";
import FormQualityRefference from "../../pages/ADMIN/MASTER/QualityRefference/form";
import FormSample from "../../pages/ADMIN/MASTER/Sample/form";
import FormSampleLocation from "../../pages/ADMIN/MASTER/SampleLocation/form";
import FormLocation from "../../pages/ADMIN/MASTER/Location/form";
import FormTempCondition from "../../pages/ADMIN/MASTER/TempCondition/form";
import FormTestMethode from "../../pages/ADMIN/MASTER/TestMethode/form";
import FormTestPreparation from "../../pages/ADMIN/MASTER/TestPreparation/form";
import FormTimePoint from "../../pages/ADMIN/MASTER/TimePoint/form";
import FormVendor from "../../pages/ADMIN/MASTER/Vendor/form";
import FormWarehouse from "../../pages/ADMIN/MASTER/Warehouse/form";
import FormTestingOrder from "../../pages/ADMIN/SAMPLE_HANDLING/TestingOrder/form";
import FormPlanningTakingSample from "../../pages/ADMIN/SAMPLE_HANDLING/PlanningTakingSample/form";
import FormTakingSample from "../../pages/ADMIN/SAMPLE_HANDLING/TakingSample/form";
import FormSampleRegistration from "../../pages/ADMIN/SAMPLE_HANDLING/SampleRegistration/form";
import FormSampleHandling from "../../pages/ADMIN/SAMPLE_HANDLING/SampleHandling/form";
import FormSampleProcess from "../../pages/ADMIN/SAMPLE_HANDLING/SampleProses/form";
import FormSampleAutorize from "../../pages/ADMIN/SAMPLE_HANDLING/SampleAutorize/form";
import FormAdjustment from "../../pages/ADMIN/INVENTORY/Adjustment/form";
import FormTransferWarehouse from "../../pages/ADMIN/INVENTORY/TransferWarehouse/form";
import FormAssembly from "../../pages/ADMIN/INVENTORY/Assembly/form";
import FormProductInformation from "../../pages/ADMIN/INVENTORY/ProductInformation/form";
import FormZona from "../../pages/ADMIN/MASTER/Zona/form";
import FormSubZona from "../../pages/ADMIN/MASTER/SubZona/form";
import FormPriceList from "../../pages/ADMIN/MASTER/PriceList/form";

export const FormPages = {

    // MASTER DATA
    1102: <FormDepartment />,
    1103: <FormEquipmentType />,
    1104: <FormEquipment />,
    1105: <FormBuilding />,
    1106: <FormSampleLocation />,
    1108: <FormPackingType />,
    1109: <FormProductType />,
    1110: <FormProductCategory />,
    1111: <FormProduct />,
    1112: <FormLabour />,
    1113: <FormFormula />,
    1114: <FormManufacture />,
    1115: <FormParameter />,
    1116: <FormTimePoint />,
    1117: <FormTempCondition />,
    1118: <FormVendor />,
    1119: <FormWarehouse />,
    1120: <FormLocation />,
    1121: <FormFormulaTableRef />,
    1122: <FormCustomer />,
    1123: <FormParameterCategory />,
    1124: <FormQualityRefference />,
    1125: <FormTestPreparation />,
    1126: <FormTestMethode />,
    1127: <FormOtherExpense />,
    1128: <FormSample />,
    1129: <FormZona />,
    1130: <FormSubZona />,
    1131: <FormPriceList />,

    // SAMPLE HANDLING
    1201: <FormTestingOrder />,
    1202: <FormPlanningTakingSample />,
    1203: <FormTakingSample />,
    1204: <FormSampleRegistration />,
    1205: <FormSampleHandling />,
    1206: <FormSampleProcess />,
    1207: <FormSampleAutorize />,

    // INVENTORY
    1301: <FormAdjustment />,
    1302: <FormTransferWarehouse />,
    1303: <FormAssembly />,
    1304: <FormProductInformation />,

    // EQUIPMENT MAINTENANCE
    // 1401: <MaintenanceRequest />,
    // 1402: <MaintenanceProcess />,

    // // SETUP
    // 1501: <UserTrustee />,
    // 1502: <SetupApprovalDM />,
    // 1503: <SetupApprovalLS />,
    // 1504: <SetupApprovalIV />,
    // 1505: <ResetPassword />,
    // 1506: <UserLog />,

    // // APPROVAL
    // 1601: <ApprovalDM />,
    // 1602: <ApprovalLS />,
    // 1603: <ApprovalIV />,
}