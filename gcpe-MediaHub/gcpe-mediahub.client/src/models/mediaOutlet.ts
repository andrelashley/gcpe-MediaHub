

enum mediaType {
    tv,
    web,
    radio,
}

enum languages {
    english, 
    french,
    mandarin,
    punjabi,
    spanish,
    tagalog,
}

export class MediaOutlet {
    id: Number = 0;
    outletName: String;
    email: String;
    phone: String;
    mediaType: mediaType[] = [];
    languages: languages[] = [];

    constructor(name: string, email: string, phone: string ) {
        this.name = name;
        this.email = email;
        this.phone = phone;
    }


}

export default MediaOutlet;
