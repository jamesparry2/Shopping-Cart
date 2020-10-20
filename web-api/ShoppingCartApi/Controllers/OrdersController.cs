using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using ShoppingCartBusinessLayer.cs.OrderServices;
using ShoppingCartDataLayer.Models;

namespace ShoppingCartApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderServices _orderServices;

        public OrdersController(IOrderServices orderServices)
        {
            _orderServices = orderServices;
        }

        [HttpGet]
        public IActionResult GetAllOrders()
        {
            return Ok(_orderServices.GetOrders());
        }

        [HttpPost]
        public IActionResult CreateOrder([FromBody]IEnumerable<Item> items)
        {
            var response = _orderServices.CreateOrders(items);
            return response ? Ok() : StatusCode(503);
        }
    }
}