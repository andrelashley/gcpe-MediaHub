
enum phoneType {
    primaray,
    mobile,
    callIn,
    backUp,
}
export class ContactPhone {
    type: phoneType | undefined;
    phoneNumber: number | undefined;
}

export default ContactPhone;