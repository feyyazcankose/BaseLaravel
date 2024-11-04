<?php

namespace App\Core\Enums;

enum RoleTypes: string
{
    case USER_VIEW = 'USER_VIEW';
    case USER_CREATE = 'USER_CREATE';
    case USER_UPDATE = 'USER_UPDATE';
    case USER_DELETE = 'USER_DELETE';

    case ADMIN_VIEW = 'ADMIN_VIEW';
    case ADMIN_ROLE = 'ADMIN_ROLE';
    case ADMIN_CREATE = 'ADMIN_CREATE';
    case ADMIN_UPDATE = 'ADMIN_UPDATE';
    case ADMIN_DELETE = 'ADMIN_DELETE';

    case SURVEY_VIEW = 'SURVEY_VIEW';
    case SURVEY_CREATE = 'SURVEY_CREATE';
    case SURVEY_UPDATE = 'SURVEY_UPDATE';
    case SURVEY_DELETE = 'SURVEY_DELETE';

    case CATEGORY_VIEW = 'CATEGORY_VIEW';
    case CATEGORY_CREATE = 'CATEGORY_CREATE';
    case CATEGORY_UPDATE = 'CATEGORY_UPDATE';
    case CATEGORY_DELETE = 'CATEGORY_DELETE';

    case SLIDER_VIEW = 'SLIDER_VIEW';
    case SLIDER_CREATE = 'SLIDER_CREATE';
    case SLIDER_UPDATE = 'SLIDER_UPDATE';
    case SLIDER_DELETE = 'SLIDER_DELETE';

    case FEEDBACK_VIEW = 'FEEDBACK_VIEW';
}