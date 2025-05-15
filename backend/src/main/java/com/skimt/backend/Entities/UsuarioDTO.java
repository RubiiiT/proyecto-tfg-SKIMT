package com.skimt.backend.Entities;

import com.fasterxml.jackson.annotation.JsonProperty;

public class UsuarioDTO {
    @JsonProperty("usuario_id")
    private Long usuario_id;
    private String nombre;
    @JsonProperty("firebase_uid")
    private String firebase_uid;
    private String email;

    public UsuarioDTO() {}

    public UsuarioDTO(Long usuarioId, String nombre, String firebaseUid, String email) {
        this.usuario_id = usuarioId;
        this.nombre = nombre;
        this.firebase_uid = firebaseUid;
        this.email = email;
    }

    public Long getUsuarioId() {
        return usuario_id;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuario_id = usuarioId;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getFirebaseUid() {
        return firebase_uid;
    }

    public void setFirebaseUid(String firebaseUid) {
        this.firebase_uid = firebaseUid;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
