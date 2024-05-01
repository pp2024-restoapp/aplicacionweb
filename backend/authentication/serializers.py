from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password



class UserSerializer(serializers.ModelSerializer):
   
    email = serializers.EmailField(
        required=True)
    username = serializers.CharField(
        required=True)
    first_name = serializers.CharField(
        required=True)
    last_name = serializers.CharField(
        required =True)
    password = serializers.CharField(
        min_length=8, write_only=True)
    is_staff = serializers.BooleanField()
    
    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)
    
    def update(self, instance, validated_data):
        if 'password' in validated_data:
            validated_data['password'] = make_password(validated_data['password'])
        return super().update(instance, validated_data)

    class Meta:
        model = get_user_model()
        fields = ('id','email', 'username', 'first_name', 'last_name', 'password', 'is_staff')
