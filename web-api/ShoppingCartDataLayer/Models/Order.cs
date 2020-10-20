using System;
using System.Collections.Generic;
using System.Text;

namespace ShoppingCartDataLayer.Models
{
    // Linkage Table
    public class Order
    {
        public Guid? Id { get; set; }
        public int? ItemId { get; set; }
    }
}
