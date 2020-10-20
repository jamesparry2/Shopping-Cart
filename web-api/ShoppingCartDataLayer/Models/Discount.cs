using System.ComponentModel.DataAnnotations.Schema;

namespace ShoppingCartDataLayer.Models
{
    public class Discount
    {
        public int Id { get; set; }
        public int? Percentage { get; set; }
        public bool? HasBeenApplied { get; set; }
        public bool? HasBeenUsed { get; set; }
    }
}
