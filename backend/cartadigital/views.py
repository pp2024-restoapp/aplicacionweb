from django.shortcuts import render
from django.http import HttpResponse 
from rest_framework import generics
from cartadigital.models import Categoria, Producto, Pedido
from cartadigital.serializers import *
from authentication.models import CustomUser
from authentication.serializers import UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
import mercadopago



# Create your views here.
#def inicio(request):
#   return HttpResponse("Bienvenido a CartaDigtal App")
 

class CategoriaList(generics.ListCreateAPIView):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

class CategoriaDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

class ProductoList(generics.ListCreateAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

class ProductoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

class UserList(generics.ListCreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

class PedidoList(generics.ListCreateAPIView):
    queryset = Pedido.objects.all()
    serializer_class = PedidoSerializer
class PedidoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Pedido.objects.all()
    serializer_class = PedidoSerializer

class retornarPagado(APIView):  # Retornar custom json 
    def get(self, request):
        return Response({"respuesta": "aprobado"})

class ProcessPaymentAPIView(APIView):
    def post(self, request):
        try:
            request_values = json.loads(request.body)
            payment_data = {
                "transaction_amount": float(request_values["transaction_amount"]),
                "token": request_values["token"],
                "installments": int(request_values["installments"]),
                "payment_method_id": request_values["payment_method_id"],
                "issuer_id": request_values["issuer_id"],
                "payer": {
                    "email": request_values["payer"]["email"],
                    "identification": {
                        "type": request_values["payer"]["identification"]["type"],
                        "number": request_values["payer"]["identification"]["number"],
                    },
                },
            }

            sdk = mercadopago.SDK("")

            payment_response = sdk.payment().create(payment_data)

            payment = payment_response["response"]
            status = {
                "id": payment["id"],
                "status": payment["status"],
                "status_detail": payment["status_detail"],
            }

            return Response(data={"body": status, "statusCode": payment_response["status"]}, status=201)
        except Exception as e:
            return Response(data={"body": payment_response}, status=400)

class Producto_Categoria_Promociones(generics.ListCreateAPIView):
    queryset = Producto.objects.filter(categoria = 1)
    serializer_class = Producto_Categoria

class Producto_Categoria_Entradas(generics.ListCreateAPIView):
    queryset = Producto.objects.filter(categoria = 2 )
    serializer_class = Producto_Categoria

class Producto_Categoria_Bebidas(generics.ListCreateAPIView):
    queryset = Producto.objects.filter(categoria = 3 )
    serializer_class = Producto_Categoria

class Producto_Categoria_Principal(generics.ListCreateAPIView):
    queryset = Producto.objects.filter(categoria = 4 )
    serializer_class = Producto_Categoria

class Producto_Categoria_Postres(generics.ListCreateAPIView):
    queryset = Producto.objects.filter(categoria = 5 )
    serializer_class = Producto_Categoria

class Producto_Categoria_Pastas(generics.ListCreateAPIView):
    queryset = Producto.objects.filter(categoria = 6 )
    serializer_class = Producto_Categoria

class Producto_Categoria_Ensaladas(generics.ListCreateAPIView):
    queryset = Producto.objects.filter(categoria = 7 )
    serializer_class = Producto_Categoria