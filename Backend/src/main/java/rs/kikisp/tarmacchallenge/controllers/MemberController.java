package rs.kikisp.tarmacchallenge.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import rs.kikisp.tarmacchallenge.domain.Member;
import rs.kikisp.tarmacchallenge.exceptions.MemberNotFoundException;
import rs.kikisp.tarmacchallenge.services.MemberService;
import rs.kikisp.tarmacchallenge.util.JsonUtil;

@RestController
public class MemberController {

	@Autowired
	MemberService memberService;
	
	
	@RequestMapping(value = "/members", method = RequestMethod.GET)
	public List<Member> getMembers() {
		return memberService.findAllMembers();
	}
	
	@RequestMapping(value = "/members/get", method = RequestMethod.GET)
	public Page<Member> getMembersPage(@RequestParam("page") int page ,@RequestParam("size")int size,@RequestParam(value = "search", defaultValue = "all")String search){
		Pageable pageable = PageRequest.of(page, size,Sort.by(Sort.Direction.ASC, "name"));
		if(!search.equals("all")) {
			return memberService.findBySearchPaged(search, pageable);
		}
		
		return memberService.findAllMembersPaged(pageable);
}
	
	
	
	@RequestMapping(value = "/members/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> getMember(@PathVariable("id") Long id) {
		Member member = memberService.getById(id);
		if (id < 0) {
            return ResponseEntity.badRequest().build();
        }
		if (member == null) {
			throw new  MemberNotFoundException();
		}
		return  ResponseEntity.ok(member);
	}
	
	@RequestMapping(value = "/members/", method = RequestMethod.POST)
	public ResponseEntity<?> saveMember(@RequestBody Member memberToSave) {
		
		if(memberService.checkIfMemberExist(memberToSave.getName())) {
			return ResponseEntity.badRequest().body(JsonUtil.generateMessageObject("User already exists"));
		}
		
		Member savedMember = memberService.saveMember(memberToSave);
		return ResponseEntity.ok(savedMember);
	}
	
	@RequestMapping(value = "/members/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> editMember(@RequestBody Member memberToEdit, @PathVariable Long id) {
		
		Member memberToUpdate = memberService.getById(id);
		if(memberToUpdate == null) {
			memberToEdit.setId(id);
			Member savedMember =memberService.saveMember(memberToEdit);
			return ResponseEntity.ok(savedMember);
		}
		memberToUpdate.setName(memberToEdit.getName());
		memberToUpdate.setCity(memberToEdit.getCity());
		memberToUpdate.setRole(memberToEdit.getRole());
		memberToUpdate.setPicture_url(memberToEdit.getPicture_url());
		Member editedMember = memberService.saveMember(memberToUpdate);
		return ResponseEntity.ok(editedMember);
	}
	
	@RequestMapping(value = "/members/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<?> deleteMember(@PathVariable Long id) {
		
			memberService.deleteById(id);
			return ResponseEntity.ok().build();
		
	
}
	}
