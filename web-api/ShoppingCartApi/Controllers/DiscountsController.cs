using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ShoppingCartBusinessLayer.DiscountService;
using ShoppingCartDataLayer.Models;
using ShoppingCartDataLayer.Repository.Discounts;

namespace ShoppingCartApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DiscountsController : ControllerBase
    {
        private IDiscountService _discountService;

        public DiscountsController(IDiscountService discountService)
        {
            _discountService = discountService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_discountService.GetDiscounts());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await _discountService.GetDiscount(id));
        }
    }
}