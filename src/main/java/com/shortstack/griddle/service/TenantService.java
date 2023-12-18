package com.shortstack.griddle.service;

import com.shortstack.griddle.model.Tenant;
import com.shortstack.griddle.repository.TenantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class TenantService {
    @Autowired
    TenantRepository tenantRepository;

    public List<Tenant> getAllTenants() {
        return tenantRepository.findAll();
    }

    public void save(Tenant tenant) {
        tenantRepository.createTenant(tenant.getFirstName(), tenant.getLastName(),
                tenant.getEmail(), tenant.getPhone(), tenant.getUsername(), tenant.getPassword(),
                tenant.getBalance());
    }


//    public Tenant findTenant(int id) {
//        return tenantRepository.findById(id);
//    }

//    public Tenant updateTenant(Tenant tenant) {
//        Optional<Tenant> optionalLandlord = tenantRepository.findById(tenant.getTenantId());
//        Tenant oldTenant = null;
//        if (optionalLandlord.isPresent()) {
//            oldTenant = optionalLandlord.get();
//            oldTenant.setTenantId(tenant.getTenantId());
//            oldTenant.setEmail(tenant.getEmail());
//            oldTenant.setFirstName(tenant.getFirstName());
//            oldTenant.setLastName(tenant.getLastName());
//            oldTenant.setUsername(tenant.getUsername());
//            oldTenant.setPassword(tenant.getPassword());
//            oldTenant.setBalance(tenant.getBalance());
//        } else {
//            return new Tenant();
//        }
//        return oldTenant;
//    }

    public String deleteTenant(int id) {
        tenantRepository.deleteById(id);
        return "Tenant deleted";
    }

}
