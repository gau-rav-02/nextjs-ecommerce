export const ADMIN_DASHBOARD = '/admin/dashboard'

//Media routes
export const ADMIN_MEDIA_SHOW = '/admin/media'
export const ADMIN_MEDIA_EDIT = (id) => id? `/admin/media/edit/${id}` : ''

export const ADMIN_CATEGORY_ADD = '/admin/category/add'
export const ADMIN_CATEGORY_SHOW = '/admin/category'

export const ADMIN_PRODUCT_ADD = '/admin/product/add'
export const ADMIN_PRODUCT_SHOW = '/admin/product'
export const ADMIN_PRODUCT_EDIT = (id) => id? `/admin/product/edit/${id}` : ''


export const ADMIN_CUSTOMERS_SHOW = '/admin/customers'

export const ADMIN_REVIEW_SHOW = '/admin/review'


export const ADMIN_TRASH = '/admin/trash'