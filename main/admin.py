from django.contrib import admin

from main.models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'password', 'first_name', 'last_name', 'email', 'is_active', 'is_superuser',
                    'is_staff', 'date_joined')
    fields = (
        'username',
        'password',
        'email', ('first_name', 'last_name'),
        'uid',
        ('is_superuser', 'is_staff', 'is_active'),
        ('last_login', 'date_joined'),
        'groups', 'user_permissions',
    )
    readonly_fields = ('last_login', 'date_joined', 'uid')
    search_fields = ('username',)