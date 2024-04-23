from django.urls import path,re_path
from django.urls import re_path as url
from . import views

urlpatterns = [
  
  	#path('',views.inicio,name='inicio' ),
    url(r'^categoria$', views.CategoriaList.as_view()),
    url(r'^categoria/(?P<pk>[0-9]+)$', views.CategoriaDetail.as_view()),
    url(r'^producto$', views.ProductoList.as_view()),
    url(r'^producto/(?P<pk>[0-9]+)$', views.ProductoDetail.as_view()),
    url(r'^user$', views.UserList.as_view()),
    url(r'^user/(?P<pk>[0-9]+)$', views.UserDetail.as_view()),
    url(r'^pedido$', views.PedidoList.as_view()),
    url(r'^pedido/(?P<pk>[0-9]+)$', views.PedidoDetail.as_view()),
    url(r'^retornarPagado$', views.retornarPagado.as_view(), name='retornarPagado'),
    url(r'^ProcessPaymentAPIView$', views.ProcessPaymentAPIView.as_view(), name='processPaymentMpago'),

	]



