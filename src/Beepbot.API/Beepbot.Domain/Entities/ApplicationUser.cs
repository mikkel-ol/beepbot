using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Beepbot.Domain.Entities
{
    public class ApplicationUser : IdentityUser
    {        
        [NotMapped]
        public string FullName => string.Concat(FirstName, " ", LastName);
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public long LastLoginTimeStamp { get; set; }
        [NotMapped]
        public IEnumerable<IdentityUserClaim<string>> Claims { get; set; }
    }
}
