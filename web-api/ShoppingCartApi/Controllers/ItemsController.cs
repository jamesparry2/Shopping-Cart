using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ShoppingCartBusinessLayer.ItemServices;
using ShoppingCartDataLayer.Models;
using ShoppingCartDataLayer.Repository.Items;

namespace ShoppingCartApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private IItemServices _itemsService;

        public ItemsController(IItemServices itemsService)
        {
            _itemsService = itemsService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_itemsService.GetItems());
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await _itemsService.GetItem(id));
        }
    }
}