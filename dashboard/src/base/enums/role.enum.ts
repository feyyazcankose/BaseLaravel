export class ERole {
    static readonly Public = "Public";

    static readonly ADMIN_VIEW = "ADMIN_VIEW";
    static readonly ADMIN_ROLE = "ADMIN_ROLE";
    static readonly ADMIN_CREATE = "ADMIN_CREATE";
    static readonly ADMIN_UPDATE = "ADMIN_UPDATE";
    static readonly ADMIN_DELETE = "ADMIN_DELETE";

    static readonly PROJECT_VIEW = "PROJECT_VIEW";
    static readonly PROJECT_CREATE = "PROJECT_CREATE";
    static readonly PROJECT_UPDATE = "PROJECT_UPDATE";
    static readonly PROJECT_DELETE = "PROJECT_DELETE";

    static readonly USER_VIEW = "USER_VIEW";
    static readonly USER_CREATE = "USER_CREATE";
    static readonly USER_UPDATE = "USER_UPDATE";
    static readonly USER_DELETE = "USER_DELETE";

    static readonly MOD_VIEW = "MOD_VIEW";
    static readonly MOD_CREATE = "MOD_CREATE";
    static readonly MOD_UPDATE = "MOD_UPDATE";
    static readonly MOD_DELETE = "MOD_DELETE";

    static readonly OBSERVER_VIEW = "OBSERVER_VIEW";
    static readonly OBSERVER_CREATE = "OBSERVER_CREATE";
    static readonly OBSERVER_UPDATE = "OBSERVER_UPDATE";
    static readonly OBSERVER_DELETE = "OBSERVER_DELETE";

    static readonly COMPANY_VIEW = "COMPANY_VIEW";
    static readonly COMPANY_CREATE = "COMPANY_CREATE";
    static readonly COMPANY_UPDATE = "COMPANY_UPDATE";
    static readonly COMPANY_DELETE = "COMPANY_DELETE";

    static readonly SLIDER_VIEW = "SLIDER_VIEW";
    static readonly SLIDER_CREATE = "SLIDER_CREATE";
    static readonly SLIDER_UPDATE = "SLIDER_UPDATE";
    static readonly SLIDER_DELETE = "SLIDER_DELETE";

    static readonly CATEGORY_VIEW = "CATEGORY_VIEW";
    static readonly CATEGORY_CREATE = "CATEGORY_CREATE";
    static readonly CATEGORY_UPDATE = "CATEGORY_UPDATE";
    static readonly CATEGORY_DELETE = "CATEGORY_DELETE";

    static readonly FEEDBACK_VIEW = "FEEDBACK_VIEW";
    static readonly AWARD_VIEW = "AWARD_VIEW";
    static readonly AWARD_UPDATE = "AWARD_UPDATE";
}

export class ERolePath {
    static readonly "/anasayfa" = ERole.Public;
    static readonly "/aktiviteler" = ERole.Public;
    static readonly "/bildirimler" = ERole.Public;
    static readonly "/hesabim" = ERole.Public;
    static readonly "/projeler" = ERole.PROJECT_VIEW;
    static readonly "/projeler/ekle" = ERole.PROJECT_CREATE;
    static readonly "/projeler/duzenle/:id" = ERole.PROJECT_UPDATE;
    static readonly "/projeler/detay/:id" = ERole.PROJECT_VIEW;

    static readonly "/yoneticiler" = ERole.ADMIN_VIEW;
    static readonly "/yoneticiler/ekle" = ERole.ADMIN_CREATE;
    static readonly "/yoneticiler/duzenle/:id" = ERole.ADMIN_UPDATE;
    static readonly "/yoneticiler/yetki/:id" = ERole.ADMIN_ROLE;

    static readonly "/sirketler" = ERole.COMPANY_VIEW;
    static readonly "/sirketler/ekle" = ERole.COMPANY_CREATE;
    static readonly "/sirketler/duzenle/:id" = ERole.COMPANY_UPDATE;

    static readonly "/sliderlar" = ERole.SLIDER_VIEW;
    static readonly "/sliderlar/ekle" = ERole.SLIDER_CREATE;
    static readonly "/sliderlar/duzenle/:id" = ERole.SLIDER_UPDATE;

    static readonly "/kullanicilar" = ERole.USER_VIEW;
    static readonly "/kullanicilar/ekle" = ERole.USER_CREATE;
    static readonly "/kullanicilar/duzenle/:id" = ERole.USER_UPDATE;
    static readonly "/kullanicilar/detay/:id" = ERole.USER_VIEW;

    static readonly "/hediye-istekleri" = ERole.AWARD_VIEW;
    static readonly "/hediye-istekleri/duzenle/:id" = ERole.AWARD_UPDATE;

    static readonly "/kategoriler" = ERole.CATEGORY_VIEW;
    static readonly "/kategoriler/ekle" = ERole.CATEGORY_CREATE;
    static readonly "/kategoriler/duzenle/:id" = ERole.CATEGORY_UPDATE;

    static readonly "/dosya-yoneticisi" = ERole.Public;
    static readonly "/geri-bildirimler" = ERole.FEEDBACK_VIEW;
}
