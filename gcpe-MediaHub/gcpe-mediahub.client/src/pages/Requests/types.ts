/**
 * Status values for a media request.
 */
export enum RequestStatus {
    New = "New",
    Pending = "Pending",
    Rejected = "Rejected",
    Reviewed = "Reviewed",
    Scheduled = "Scheduled",
    Unavailable = "Unavailable",
    Approved = "Approved",
    Completed = "Completed"
}

/**
 * Types of media requests.
 */
export enum RequestType {
    Information = "Information",
    Interview = "Interview",
    ScrumHalls = "Scrum/Halls"
}

/**
 * Supported ministries for requests.
 */
export enum Ministry {
    AF = "Agriculture and Food",
    AG = "Attorney General",
    CTIZ = "Citizens' Services",
    ECC = "Education and Child Care",
    EMCR = "Emergency Management and Climate Readiness",
    ECS = "Energy and Climate Solutions",
    ENV = "Environment and Climate Change",
    FIN = "Finance",
    FOR = "Forests",
    HLTH = "Health",
    HOUS = "Housing and Municipal Affairs",
    INFR = "Infrastructure",
    IRR = "Indigenous Relations and Reconciliation",
    JEDI = "Jobs, Economic Development and Innovation",
    LBR = "Labour",
    MCM = "Mining and Critical Minerals",
    MCFD = "Children and Family Development",
    MOTI = "Transportation and Transit",
    PSFS = "Post-Secondary Education and Future Skills",
    PSSG = "Public Safety and Solicitor General",
    SDPR = "Social Development and Poverty Reduction",
    TACS = "Tourism, Arts, Culture and Sport",
    WLRS = "Water, Land and Resource Stewardship",
}