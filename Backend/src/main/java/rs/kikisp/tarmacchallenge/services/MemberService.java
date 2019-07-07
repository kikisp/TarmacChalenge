package rs.kikisp.tarmacchallenge.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import rs.kikisp.tarmacchallenge.domain.Member;
import rs.kikisp.tarmacchallenge.repositories.MemberRepository;

@Service
public class MemberService {
	
	@Autowired
	private MemberRepository memberRepository;
	
	public List<Member> findAllMembers(){
		
		 return memberRepository.findAll();
		
	}
	
	public Page<Member> findAllMembersPaged(Pageable pageable){
		
		 return memberRepository.findAll(pageable);
		
	}
	
	public Page<Member> findBySearchPaged(String search, Pageable pageable) {
       

        return memberRepository.findBySearch(search,pageable);
	}

	
	public Member saveMember(Member member) { 
		return memberRepository.save(member);
		
	}
	
	public Member getByName(String name) {
		return memberRepository.findByName(name);
		
	}
	
	public boolean checkIfMemberExist(String name) {
		Member member = memberRepository.findByName(name);
		return member != null ? true:false;
	}
	
	public Member getById(Long id) {
		Member member = null;
		if( memberRepository.findById(id).isPresent()) {
			member = memberRepository.findById(id).get();
		}
		return member;
		
	}
	
	public void deleteAll() {
		memberRepository.deleteAll();
	}
	
	public void deleteById(Long id) {
		memberRepository.deleteById(id);
	}

}
