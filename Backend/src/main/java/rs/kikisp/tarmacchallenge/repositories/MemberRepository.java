package rs.kikisp.tarmacchallenge.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import rs.kikisp.tarmacchallenge.domain.Member;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long>{
		
	Member findByName(String name);
	
	@Query("SELECT m FROM Member m WHERE " +
            "LOWER(m.role) LIKE LOWER(CONCAT('%',:search, '%')) OR " +
"LOWER(m.city) LIKE LOWER(CONCAT('%',:search, '%'))")
	Page<Member> findBySearch(String search, Pageable pageable);
	

}
