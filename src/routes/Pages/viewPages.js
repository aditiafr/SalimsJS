import ApprovalDM from "../../pages/ADMIN/APPROVAL/ApprovalDM";
import ApprovalIV from "../../pages/ADMIN/APPROVAL/ApprovalIV";
import ApprovalLS from "../../pages/ADMIN/APPROVAL/ApprovalLS";
import MaintenanceProcess from "../../pages/ADMIN/EQUIPMENT_MAINTENANCE/MaintenanceProcess";
import MaintenanceRequest from "../../pages/ADMIN/EQUIPMENT_MAINTENANCE/MaintenanceRequest";
import Adjustment from "../../pages/ADMIN/INVENTORY/Adjustment";
import Assembly from "../../pages/ADMIN/INVENTORY/Assembly";
import ProductInformation from "../../pages/ADMIN/INVENTORY/ProductInformation";
import TransferWarehouse from "../../pages/ADMIN/INVENTORY/TransferWarehouse";
import Building from "../../pages/ADMIN/MASTER/Building";
import Customer from "../../pages/ADMIN/MASTER/Customer";
import Department from "../../pages/ADMIN/MASTER/Department";
import Equipment from "../../pages/ADMIN/MASTER/Equipment";
import EquipmentType from "../../pages/ADMIN/MASTER/EquipmentType";
import Formula from "../../pages/ADMIN/MASTER/Formula";
import FormulaTableRef from "../../pages/ADMIN/MASTER/FormulaTableRef";
import Labour from "../../pages/ADMIN/MASTER/Labour";
import Manufacture from "../../pages/ADMIN/MASTER/Manufacture";
import OtherExpense from "../../pages/ADMIN/MASTER/OtherExpense";
import PackingType from "../../pages/ADMIN/MASTER/PackingType";
import Parameter from "../../pages/ADMIN/MASTER/Parameter";
import ParameterCategory from "../../pages/ADMIN/MASTER/ParameterCategory";
import Product from "../../pages/ADMIN/MASTER/Product";
import ProductCategory from "../../pages/ADMIN/MASTER/ProductCategory";
import ProductType from "../../pages/ADMIN/MASTER/ProductType";
import QualityRefference from "../../pages/ADMIN/MASTER/QualityRefference";
import Sample from "../../pages/ADMIN/MASTER/Sample";
import SampleLocation from "../../pages/ADMIN/MASTER/SampleLocation";
import Location from "../../pages/ADMIN/MASTER/Location";
import TempCondition from "../../pages/ADMIN/MASTER/TempCondition";
import TestMethode from "../../pages/ADMIN/MASTER/TestMethode";
import TestPreparation from "../../pages/ADMIN/MASTER/TestPreparation";
import TimePoint from "../../pages/ADMIN/MASTER/TimePoint";
import Vendor from "../../pages/ADMIN/MASTER/Vendor";
import Warehouse from "../../pages/ADMIN/MASTER/Warehouse";
import PlanningTakingSample from "../../pages/ADMIN/SAMPLE_HANDLING/PlanningTakingSample";
import SampleAutorize from "../../pages/ADMIN/SAMPLE_HANDLING/SampleAutorize";
import SampleHandling from "../../pages/ADMIN/SAMPLE_HANDLING/SampleHandling";
import SampleProcess from "../../pages/ADMIN/SAMPLE_HANDLING/SampleProses";
import SampleRegistration from "../../pages/ADMIN/SAMPLE_HANDLING/SampleRegistration";
import TakingSample from "../../pages/ADMIN/SAMPLE_HANDLING/TakingSample";
import TestingOrder from "../../pages/ADMIN/SAMPLE_HANDLING/TestingOrder";
import ResetPassword from "../../pages/ADMIN/SETUP/ResetPassword";
import SetupApprovalDM from "../../pages/ADMIN/SETUP/SetupApprovalDM";
import SetupApprovalIV from "../../pages/ADMIN/SETUP/SetupApprovalIV";
import SetupApprovalLS from "../../pages/ADMIN/SETUP/SetupApprovalLS";
import UserLog from "../../pages/ADMIN/SETUP/UserLog";
import UserTrustee from "../../pages/ADMIN/SETUP/UserTrustee";

export const ViewPages = {
    // MASTER DATA
    1102: <Department />,
    1103: <EquipmentType />,
    1104: <Equipment />,
    1105: <Building />,
    1106: <SampleLocation />,
    1108: <PackingType />,
    1109: <ProductType />,
    1110: <ProductCategory />,
    1111: <Product />,
    1112: <Labour />,
    1113: <Formula />,
    1114: <Manufacture />,
    1115: <Parameter />,
    1116: <TimePoint />,
    1117: <TempCondition />,
    1118: <Vendor />,
    1119: <Warehouse />,
    1120: <Location />,
    1121: <FormulaTableRef />,
    1122: <Customer />,
    1123: <ParameterCategory />,
    1124: <QualityRefference />,
    1125: <TestPreparation />,
    1126: <TestMethode />,
    1127: <OtherExpense />,
    1128: <Sample />,

    // SAMPLE HANDLING
    1201: <TestingOrder />,
    1202: <PlanningTakingSample />,
    1203: <TakingSample />,
    1204: <SampleRegistration />,
    1205: <SampleHandling />,
    1206: <SampleProcess />,
    1207: <SampleAutorize />,

    // INVENTORY
    1301: <Adjustment />,
    1302: <TransferWarehouse />,
    1303: <Assembly />,
    1304: <ProductInformation />,

    // EQUIPMENT MAINTENANCE
    1401: <MaintenanceRequest />,
    1402: <MaintenanceProcess />,

    // SETUP
    1501: <UserTrustee />,
    1502: <SetupApprovalDM />,
    1503: <SetupApprovalLS />,
    1504: <SetupApprovalIV />,
    1505: <ResetPassword />,
    1506: <UserLog />,

    // APPROVAL
    1601: <ApprovalDM />,
    1602: <ApprovalLS />,
    1603: <ApprovalIV />,
}